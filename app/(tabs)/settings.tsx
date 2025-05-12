import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, ArrowLeft, RefreshCw, Bell, Clock, CreditCard } from 'lucide-react-native';

export default function SettingsScreen() {
  const { theme, colors, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Appearance
        </Text>
        <View style={[styles.settingRow, { backgroundColor: colors.background.secondary }]}>
          <View style={styles.settingLabelContainer}>
            {isDarkMode ? (
              <Moon size={20} color={colors.text.primary} style={styles.settingIcon} />
            ) : (
              <Sun size={20} color={colors.text.primary} style={styles.settingIcon} />
            )}
            <Text style={[styles.settingLabel, { color: colors.text.primary }]}>
              Dark Mode
            </Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.borderLight, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Data
        </Text>
        <TouchableOpacity style={[styles.settingRow, { backgroundColor: colors.background.secondary }]}>
          <View style={styles.settingLabelContainer}>
            <RefreshCw size={20} color={colors.text.primary} style={styles.settingIcon} />
            <Text style={[styles.settingLabel, { color: colors.text.primary }]}>
              Sync Frequency
            </Text>
          </View>
          <View style={styles.settingValueContainer}>
            <Text style={[styles.settingValue, { color: colors.text.secondary }]}>
              5 minutes
            </Text>
            <ArrowLeft size={16} color={colors.text.secondary} style={styles.arrowIcon} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingRow, { backgroundColor: colors.background.secondary }]}>
          <View style={styles.settingLabelContainer}>
            <Clock size={20} color={colors.text.primary} style={styles.settingIcon} />
            <Text style={[styles.settingLabel, { color: colors.text.primary }]}>
              Schedule Cache Duration
            </Text>
          </View>
          <View style={styles.settingValueContainer}>
            <Text style={[styles.settingValue, { color: colors.text.secondary }]}>
              1 day
            </Text>
            <ArrowLeft size={16} color={colors.text.secondary} style={styles.arrowIcon} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Notifications
        </Text>
        <View style={[styles.settingRow, { backgroundColor: colors.background.secondary }]}>
          <View style={styles.settingLabelContainer}>
            <Bell size={20} color={colors.text.primary} style={styles.settingIcon} />
            <Text style={[styles.settingLabel, { color: colors.text.primary }]}>
              Service Disruptions
            </Text>
          </View>
          <Switch
            value={true}
            trackColor={{ false: colors.borderLight, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>

        <View style={[styles.settingRow, { backgroundColor: colors.background.secondary }]}>
          <View style={styles.settingLabelContainer}>
            <CreditCard size={20} color={colors.text.primary} style={styles.settingIcon} />
            <Text style={[styles.settingLabel, { color: colors.text.primary }]}>
              Platform Changes
            </Text>
          </View>
          <Switch
            value={true}
            trackColor={{ false: colors.borderLight, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          About
        </Text>
        <View style={[styles.settingRow, { backgroundColor: colors.background.secondary }]}>
          <Text style={[styles.settingLabel, { color: colors.text.primary }]}>
            Version
          </Text>
          <Text style={[styles.settingValue, { color: colors.text.secondary }]}>
            1.0.0
          </Text>
        </View>

        <TouchableOpacity style={[styles.settingRow, { backgroundColor: colors.background.secondary }]}>
          <Text style={[styles.settingLabel, { color: colors.text.primary }]}>
            Privacy Policy
          </Text>
          <ArrowLeft size={16} color={colors.text.secondary} style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingRow, { backgroundColor: colors.background.secondary }]}>
          <Text style={[styles.settingLabel, { color: colors.text.primary }]}>
            Terms of Service
          </Text>
          <ArrowLeft size={16} color={colors.text.secondary} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 1,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  settingValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    marginRight: 4,
  },
  arrowIcon: {
    transform: [{ rotate: '180deg' }],
  },
});