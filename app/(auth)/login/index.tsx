import { apiWithNoAuth } from "@/api/client";
import { Colors } from "@/constants/theme";
import { useAuthStore } from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("dauthang811@gmail.com");
  const [password, setPassword] = useState("Admin@123");
  const { setUser, setToken } = useAuthStore();

  const login = useCallback(async () => {
    try {
      const res = await apiWithNoAuth.post("auth/login", { email, password });

      setUser(res.data.user);
      setToken(res.data.accessToken);
      router.replace("/home");
    } catch (error) {
      console.log(error, "lkfjds");
    }
  }, [email, password, setToken, setUser]);

  return (
    <View style={styles.container}>
      <View style={styles.topBackground} />

      <Text style={styles.title}>Welcome</Text>

      <View style={styles.form}>
        {/* Username / Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          placeholderTextColor="#b0b0b0"
          onChange={(e) => setEmail(e.nativeEvent.text)}
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            secureTextEntry={!showPassword}
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color="#4f4f4f"
            />
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign Up */}
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => router.push("/(auth)/register")}
        >
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Biometric */}
        <Text style={styles.fingerprintText}>
          Use{" "}
          <Text
            style={{
              color: Colors.primary,
            }}
          >
            Fingerprint
          </Text>{" "}
          To Access
        </Text>

        {/* Social Login */}
        <Text
          style={{
            marginTop: 28,
            marginBottom: 10,
            color: "#666",
            textAlign: "center",
          }}
        >
          or sign up with
        </Text>

        <View style={styles.socialRow}>
          <Ionicons name="logo-facebook" size={26} color="#3b5998" />
          <Ionicons name="logo-google" size={26} color="#db4437" />
        </View>

        <Text style={styles.bottomText}>
          Don&apos;t have an account?{" "}
          <Text style={{ color: Colors.primary }}>Sign Up</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  topBackground: {
    width: "100%",
    height: 125,
    backgroundColor: Colors.primary,
    position: "absolute",
    top: 0,
  },
  title: {
    marginTop: 50,
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  form: {
    backgroundColor: "#fff",
    padding: 30,
    width: "100%",
    marginTop: 45,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    height: "100%",
  },
  label: {
    color: "#333",
    marginTop: 16,
    marginBottom: 4,
    fontWeight: 600,
  },
  input: {
    padding: 14,
    borderRadius: 15,
    fontSize: 15,
    backgroundColor: Colors.input.background,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.input.background,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 15,
  },
  inputPassword: {
    flex: 1,
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 26,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgot: {
    textAlign: "center",
    marginTop: 12,
    color: "#333",
  },
  signupButton: {
    marginTop: 18,
    padding: 16,
    borderRadius: 30,
    backgroundColor: Colors.input.background,
    alignItems: "center",
  },
  signupText: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  fingerprintText: {
    marginTop: 18,
    textAlign: "center",
    color: "#333",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 35,
  },
  bottomText: {
    textAlign: "center",
    marginTop: 20,
    color: "#333",
  },
});
