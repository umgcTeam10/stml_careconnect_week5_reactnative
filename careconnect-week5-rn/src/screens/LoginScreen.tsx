import {
  Alert,
  AccessibilityInfo,
  findNodeHandle,
  InteractionManager,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { PrimaryButton } from "@/src/components/PrimaryButton";
import { TextField } from "@/src/components/TextField";
import { AuthStackParamList } from "@/src/navigation/AuthStack";
import { RootStackParamList } from "@/src/navigation/RootNavigator";
import { colors, fontSizes, spacing } from "@/src/utils/theme";

type LoginScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, "Login">,
  NativeStackScreenProps<RootStackParamList>
>;

export function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const emailInputRef = useRef<React.ComponentRef<typeof TextInput>>(null);

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        const node = findNodeHandle(emailInputRef.current);
        if (node) {
          AccessibilityInfo.setAccessibilityFocus(node);
        }
        emailInputRef.current?.focus();
      });
      return () => task.cancel();
    }, []),
  );

  const handleSubmit = () => {
    const emailValid = email.includes("@");
    const passwordValid = password.length >= 6;

    if (!emailValid) {
      setError("Please enter a valid email.");
      return;
    }

    if (!passwordValid) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    navigation.navigate("AppTabs", { screen: "Home" });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        accessibilityLabel="Back"
        onPress={() => navigation.navigate("Welcome")}
        style={styles.backButton}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>CC</Text>
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue to CareConnect</Text>
      </View>
      <View style={styles.altOptions}>
        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.optionIcon}>
            <Text style={styles.optionIconText}>o</Text>
          </View>
          <Text style={styles.optionText}>Sign in with Face ID / Touch ID</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.optionIcon}>
            <Text style={styles.optionIconText}>o</Text>
          </View>
          <Text style={styles.optionText}>Email me a sign-in link</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR CONTINUE WITH EMAIL</Text>
        <View style={styles.dividerLine} />
      </View>
      <View style={styles.form}>
        <TextField
          ref={emailInputRef}
          accessibilityLabel="Email Address"
          keyboardType="email-address"
          label="Email Address"
          onChangeText={(text) => {
            setEmail(text);
            if (error) {
              setError("");
            }
          }}
          placeholder="you@example.com"
          testID="login-email"
          value={email}
        />
        <TextField
          accessibilityLabel="Password"
          label="Password"
          onChangeText={(text) => {
            setPassword(text);
            if (error) {
              setError("");
            }
          }}
          placeholder="Enter your password"
          secureTextEntry
          testID="login-password"
          value={password}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.rememberRow}>
          <View style={styles.rememberLeft}>
            <TouchableOpacity
              accessibilityRole="checkbox"
              accessibilityState={{ checked: rememberMe }}
              onPress={() => setRememberMe((prev) => !prev)}
              style={[styles.checkbox, rememberMe && styles.checkboxSelected]}
            >
              {rememberMe ? <View style={styles.checkboxInner} /> : null}
            </TouchableOpacity>
            <Text style={styles.rememberText}>Remember me</Text>
          </View>
          <TouchableOpacity
            accessibilityLabel="Forgot password"
            onPress={() =>
              Alert.alert(
                "Reset password",
                "We will help you reset your password soon.",
              )
            }
            testID="login-forgot"
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <PrimaryButton
          accessibilityLabel="Sign in"
          onPress={handleSubmit}
          testID="login-submit"
          title="Sign in"
        />
        <Text style={styles.footerText}>
          Don&apos;t have an account? Sign up
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    gap: spacing.lg,
  },
  backButton: {
    alignSelf: "flex-start",
  },
  backText: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    fontWeight: "600",
  },
  header: {
    alignItems: "center",
    gap: spacing.sm,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: colors.onPrimary,
    fontSize: fontSizes.lg,
    fontWeight: "700",
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    textAlign: "center",
  },
  altOptions: {
    gap: spacing.sm,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    borderColor: colors.border,
    borderWidth: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  optionIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  optionIconText: {
    color: colors.navy,
    fontSize: fontSizes.sm,
    fontWeight: "700",
  },
  optionText: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
    fontWeight: "600",
  },
  form: {
    gap: spacing.lg,
  },
  error: {
    color: colors.error,
    fontSize: fontSizes.sm,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rememberLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    borderColor: colors.navy,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: colors.navy,
  },
  rememberText: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
  },
  forgotText: {
    color: colors.navy,
    fontSize: fontSizes.sm,
    fontWeight: "600",
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    textAlign: "center",
  },
});
