import { useState } from "react";
import {
  Bell,
  Moon,
  Sun,
  Globe,
  Shield,
  Trash2,
  Download,
  MessageSquare,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Save,
  ArrowLeft,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import useZustandStore from "../hook/useZustandStore";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const { authUser } = useZustandStore();

  // Settings state
  const [settings, setSettings] = useState({
    notifications: {
      messages: true,
      sounds: true,
      desktop: false,
    },

    privacy: {
      onlineStatus: true,
      readReceipts: true,
      lastSeen: true,
    },
    chat: {
      enterToSend: true,
      mediaAutoDownload: true,
      soundEffects: true,
    },
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    // Here you would typically save to your backend
    console.log("Saving settings:", settings);
    toast.success("Settings saved successfully!");
    setHasChanges(false);
  };

  const resetSettings = () => {
    if (
      window.confirm("Are you sure you want to reset all settings to default?")
    ) {
      setSettings({
        notifications: {
          messages: true,
          sounds: true,
          desktop: false,
        },
        appearance: {
          theme: "system",
          fontSize: "medium",
        },
        privacy: {
          onlineStatus: true,
          readReceipts: true,
          lastSeen: true,
        },
        chat: {
          enterToSend: true,
          mediaAutoDownload: true,
          soundEffects: true,
        },
      });
      setHasChanges(true);
      toast.success("Settings reset to default");
    }
  };

  const exportData = () => {
    toast.success("Data export started. You will receive an email when ready.");
  };

  const SettingToggle = ({
    label,
    description,
    checked,
    onChange,
    icon: Icon,
  }) => (
    <div className="flex items-center justify-between p-4 hover:bg-base-200/50 rounded-lg transition-colors">
      <div className="flex items-center gap-3 flex-1">
        {Icon && <Icon className="w-5 h-5 text-base-content/60" />}
        <div>
          <h3 className="font-medium text-sm sm:text-base">{label}</h3>
          {description && (
            <p className="text-xs sm:text-sm text-base-content/60 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
      <input
        type="checkbox"
        className="toggle toggle-primary"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );

  const SettingSelect = ({
    label,
    description,
    value,
    onChange,
    options,
    icon: Icon,
  }) => (
    <div className="p-4 hover:bg-base-200/50 rounded-lg transition-colors">
      <div className="flex items-center gap-3 mb-3">
        {Icon && <Icon className="w-5 h-5 text-base-content/60" />}
        <div>
          <h3 className="font-medium text-sm sm:text-base">{label}</h3>
          {description && (
            <p className="text-xs sm:text-sm text-base-content/60 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
      <select
        className="select select-bordered w-full max-w-xs text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-background/50 pt-16">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <NavLink to="/" className="btn btn-ghost btn-sm btn-circle">
            <ArrowLeft className="w-5 h-5" />
          </NavLink>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-main">
              Settings
            </h1>
            <p className="text-sm sm:text-base text-base-content/60 mt-1">
              Customize your Delhi-Chat experience
            </p>
          </div>
          {hasChanges && (
            <button
              onClick={saveSettings}
              className="btn btn-primary btn-sm gap-2 hidden sm:inline-flex"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          )}
        </div>

        <div className="grid gap-6">
          {/* Notifications */}
          <div className="card bg-background-card/20 shadow-xl">
            <div className="card-body p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-6 h-6 text-primary" />
                <h2 className="card-title text-lg sm:text-xl">Notifications</h2>
              </div>
              <div className="space-y-2">
                <SettingToggle
                  label="Message Notifications"
                  description="Get notified when you receive new messages"
                  checked={settings.notifications.messages}
                  onChange={(value) =>
                    updateSetting("notifications", "messages", value)
                  }
                  icon={MessageSquare}
                />
                <SettingToggle
                  label="Sound Notifications"
                  description="Play sound when receiving messages"
                  checked={settings.notifications.sounds}
                  onChange={(value) =>
                    updateSetting("notifications", "sounds", value)
                  }
                  icon={settings.notifications.sounds ? Volume2 : VolumeX}
                />
                <SettingToggle
                  label="Desktop Notifications"
                  description="Show desktop notifications even when app is minimized"
                  checked={settings.notifications.desktop}
                  onChange={(value) =>
                    updateSetting("notifications", "desktop", value)
                  }
                  icon={Bell}
                />
              </div>
            </div>
          </div>

          {/* Appearance */}
          {/* <div className="card bg-background-card/20 shadow-xl">
            <div className="card-body p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sun className="w-6 h-6 text-primary" />
                <h2 className="card-title text-lg sm:text-xl">Appearance</h2>
              </div>
              <div className="space-y-4">
                <SettingSelect
                  label="Theme"
                  description="Choose your preferred theme"
                  value={settings.appearance.theme}
                  onChange={(value) =>
                    updateSetting("appearance", "theme", value)
                  }
                  icon={settings.appearance.theme === "dark" ? Moon : Sun}
                  options={[
                    { value: "light", label: "Light" },
                    { value: "dark", label: "Dark" },
                    { value: "system", label: "System Default" },
                  ]}
                />
                <SettingSelect
                  label="Font Size"
                  description="Adjust text size for better readability"
                  value={settings.appearance.fontSize}
                  onChange={(value) =>
                    updateSetting("appearance", "fontSize", value)
                  }
                  icon={Eye}
                  options={[
                    { value: "small", label: "Small" },
                    { value: "medium", label: "Medium" },
                    { value: "large", label: "Large" },
                  ]}
                />
              </div>
            </div>
          </div> */}

          {/* Privacy */}
          <div className="card bg-background-card/20 shadow-xl">
            <div className="card-body p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="card-title text-lg sm:text-xl">Privacy</h2>
              </div>
              <div className="space-y-2">
                <SettingToggle
                  label="Show Online Status"
                  description="Let others see when you're online"
                  checked={settings.privacy.onlineStatus}
                  onChange={(value) =>
                    updateSetting("privacy", "onlineStatus", value)
                  }
                  icon={Globe}
                />
                <SettingToggle
                  label="Read Receipts"
                  description="Show others when you've read their messages"
                  checked={settings.privacy.readReceipts}
                  onChange={(value) =>
                    updateSetting("privacy", "readReceipts", value)
                  }
                  icon={settings.privacy.readReceipts ? Eye : EyeOff}
                />
                <SettingToggle
                  label="Last Seen"
                  description="Show when you were last active"
                  checked={settings.privacy.lastSeen}
                  onChange={(value) =>
                    updateSetting("privacy", "lastSeen", value)
                  }
                  icon={Globe}
                />
              </div>
            </div>
          </div>

          {/* Chat Settings */}
          <div className="card bg-background-card/20 shadow-xl">
            <div className="card-body p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h2 className="card-title text-lg sm:text-xl">Chat</h2>
              </div>
              <div className="space-y-2">
                <SettingToggle
                  label="Enter to Send"
                  description="Press Enter to send messages (Shift+Enter for new line)"
                  checked={settings.chat.enterToSend}
                  onChange={(value) =>
                    updateSetting("chat", "enterToSend", value)
                  }
                />
                <SettingToggle
                  label="Auto-download Media"
                  description="Automatically download images and files"
                  checked={settings.chat.mediaAutoDownload}
                  onChange={(value) =>
                    updateSetting("chat", "mediaAutoDownload", value)
                  }
                  icon={Download}
                />
                <SettingToggle
                  label="Sound Effects"
                  description="Play sounds for typing and sending messages"
                  checked={settings.chat.soundEffects}
                  onChange={(value) =>
                    updateSetting("chat", "soundEffects", value)
                  }
                  icon={settings.chat.soundEffects ? Volume2 : VolumeX}
                />
              </div>
            </div>
          </div>

          {/* Data & Storage */}
          <div className="card bg-background-card/20 shadow-xl">
            <div className="card-body p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Download className="w-6 h-6 text-primary" />
                <h2 className="card-title text-lg sm:text-xl">
                  Data & Storage
                </h2>
              </div>
              <div className="space-y-3 sm:flex sm:justify-between">
                <button
                  onClick={exportData}
                  className="btn btn-outline w-full sm:w-auto gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export My Data
                </button>
                <button
                  onClick={resetSettings}
                  className="btn btn-outline btn-warning border-main text-main hover:text-black hover:bg-main w-full sm:w-auto gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Reset All Settings
                </button>
              </div>
            </div>
          </div>

          {/* User Info */}
          {authUser && (
            <div className="card bg-background-card/20 shadow-xl">
              <div className="card-body p-4 sm:p-6">
                <h2 className="card-title text-lg sm:text-xl mb-4">
                  Account Information
                </h2>
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img
                        src={authUser.profileImage || "/avatar.png"}
                        alt={authUser.name}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{authUser.name}</h3>
                    <p className="text-base-content/60">{authUser.email}</p>
                    <NavLink
                      to="/profile"
                      className="link link-primary text-sm mt-1 inline-block"
                    >
                      Edit Profile →
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save Button - Mobile Fixed */}
        {hasChanges && (
          <div className="fixed bottom-6 right-6 sm:hidden">
            <button
              onClick={saveSettings}
              className="btn btn-primary btn-circle btn-lg shadow-lg"
            >
              <Save className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
