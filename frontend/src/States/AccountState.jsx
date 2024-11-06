import AccountContext from "../Context/AccountContext";
import userPool from "./userPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useState } from "react";
const AccountState = (props) => {
  const signup = (email, username, password) => {
    return new Promise((resolve, reject) => {
      const attributeList = [{ Name: "preferred_username", Value: username }];

      userPool.signUp(email, password, attributeList, null, (err, data) => {
        if (err) {
          console.error("Failed to register:", err.message);
          reject(err);
        } else {
          console.log("Account Created Successfully:", data);
          resolve(data);
        }
      });
    });
  };

  const confirmSignup = (email, otp) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(otp, true, (err, result) => {
        if (err) {
          console.error("Failed to verify account:", err.message);
          reject(err);
        } else {
          console.log("Account verified successfully:", result);
          resolve(result);
        }
      });
    });
  };

  // const authenticate = (Username, Password) => {
  //   return new Promise((resolve, reject) => {
  //     const user = new CognitoUser({
  //       Username,
  //       Pool: userPool,
  //     });

  //     const authDetails = new AuthenticationDetails({ Username, Password });

  //     user.authenticateUser(authDetails, {
  //       onSuccess: (data) => {
  //         console.log("Login Success:", data);
  //         resolve(data);
  //       },
  //       onFailure: (err) => {
  //         console.error("Authentication Failure:", err.message);
  //         reject(err);
  //       },
  //       newPasswordRequired: (data) => {
  //         console.log("New Password Required:", data);
  //         resolve(data);
  //       },
  //     });
  //   });
  // };


  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  const authenticate = (email, password) => {
    // Assuming authentication logic and setting session here.
    // Example: Returning a promise that resolves to a mock session object.
    return new Promise((resolve) => {
      setTimeout(() => {
        const session = { preferred_username: email.split("@")[0] }; // Mock session object
        setUsername(session.preferred_username);
        localStorage.setItem("username", session.preferred_username);
        resolve(session);
      }, 1000);
    });
  };

  const getSession = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const session = { preferred_username: username };
        resolve(session);
      }, 500);
    });
  };
  const getUserAttributes = (user) => {
    return new Promise((resolve, reject) => {
      user.getUserAttributes((err, attributes) => {
        if (err) {
          console.error("Error fetching user attributes:", err.message);
          reject(err);
        } else {
          const result = {};
          attributes.forEach(({ Name, Value }) => {
            result[Name] = Value;
          });
          if (result.preferred_username) {
            localStorage.setItem("username", result.preferred_username); // Set username to localStorage
          }
          console.log("User Attributes:", result);
          resolve(result);
        }
      });
    });
  };

  // const getSession = () => {
  //   return new Promise((resolve, reject) => {
  //     const user = userPool.getCurrentUser();

  //     if (user) {
  //       user.getSession(async (err, session) => {
  //         if (err || !session.isValid()) {
  //           console.error("Error retrieving session:", err?.message);
  //           localStorage.removeItem("username"); // Clear username from localStorage
  //           reject(err || new Error("Invalid session"));
  //         } else {
  //           try {
  //             const attributes = await getUserAttributes(user);
  //             resolve({ session, ...attributes });
  //           } catch (attrError) {
  //             reject(attrError);
  //           }
  //         }
  //       });
  //     } else {
  //       console.warn("No user session available.");
  //       localStorage.removeItem("username"); // Clear username from localStorage if no session
  //       reject(new Error("No user session available"));
  //     }
  //   });
  // };

  const logout = () => {
    const user = userPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
    localStorage.removeItem("username"); // Ensure username is removed from localStorage on logout
  };

  return (
    <AccountContext.Provider
      value={{
        signup,
        confirmSignup,
        authenticate,
        getSession,
        logout,
        getUserAttributes,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountState;
