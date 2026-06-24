const express = require("express");
const oauth = express.Router();
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const githubController = require("./github/Github.oauth.controller");
const usersSchema = require("../../modules/users/Users.schema");
const UsersSchema = require("../../modules/users/Users.schema");

oauth.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

oauth.use(passport.initialize());
oauth.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (acessToken, refreshToken, profile, done) => {
      try {
        let user = await UsersSchema.findOne({ github_id: profile.id });

        if (!user) {
          const email =
            profile.emails && profile.emails.length > 0
              ? profile.emails[0].value
              : `${profile.username}@github.local`;

          user = new UsersSchema({
            username: profile.username,
            email: email,
            github_id: profile.id,
            avatar_url: profile.photos[0].value || "https://placehold.co/150",
          });

          await user.save();
        }

        return done(null, user);
      } catch (e) {
        return done(e, null);
      }
    },
  ),
);

// GITHUB OAUTH
oauth.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);
oauth.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=true`,
  }),
  githubController.manageOauthCallback,
);

module.exports = oauth;
