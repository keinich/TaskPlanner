import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import pool from "../db.js";

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUserQuery = await pool.query(
      "select * from public.users where email = $1 limit 1 ",
      [email]
    );

    if (existingUserQuery.rows.length === 0) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const existingUser = existingUserQuery.rows[0];

    // return res.status(200).json(existingUser);

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.user_id },
      "test",
      { expiresIn: "7d" }
    );

    res.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong: " + error.message });
  }
};

export const signUp = async (req, res) => {
  try {
    // return res.status(400).json({ message: "Test Fail" });
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    const existingUserQuery = await pool.query(
      "select * from public.users where email = $1",
      [email]
    );

    if (existingUserQuery.rows.length !== 0) {
      return res.status(400).json({ message: "User already exists." });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Passwords dont match.", body: req.body });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUserQuery = await pool.query(
      "INSERT INTO public.users (email, first_name, last_name, password) VALUES($1,$2,$3,$4) RETURNING *",
      [email, firstName, lastName, hashedPassword]
    );
    const newUser = newUserQuery.rows[0];
    const token = jwt.sign({ email: newUser.email, id: newUser.user_id }, "test", {
      expiresIn: "7d",
    });
    res.status(200).json({ result: newUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong: " + error.message });
  }
};

export const signUpWithGoogle = async (req, res) => {
  try {
    // return res.status(400).json({ message: "Test Fail" });

    const { profileObj, tokenId } = req.body;
    const decodedToken = jwt.decode(tokenId);
    if (profileObj.googleId !== decodedToken?.sub) {
      return res.status(400).json({
        message: "Invalid Token",
        googleId: profileObj?.googleId,
        sub: decodedToken,
      });
    }

    const existingUserQuery = await pool.query(
      "select * from public.users where google_id = $1",
      [profileObj.googleId]
    );

    if (existingUserQuery.rows.length === 1) {
      const existingUser = existingUserQuery.rows[0];
      const appToken = jwt.sign(
        { email: existingUser.email, id: existingUser.user_id },
        "test",
        {
          expiresIn: "7d",
        }
      );
      return res.status(200).json({ result: existingUser, token: appToken });
    }

    const newUserQuery = await pool.query(
      "INSERT INTO public.users (email, first_name, last_name, google_id) VALUES($1,$2,$3,$4) RETURNING *",
      [
        profileObj.email,
        profileObj.givenName,
        profileObj.familyName,
        profileObj.googleId,
      ]
    );
    const newUser = newUserQuery.rows[0];
    const appToken = jwt.sign(
      { email: newUser.email, id: newUser.id },
      "test",
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ result: newUser, token: appToken });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong: " + error.message });
  }
};
