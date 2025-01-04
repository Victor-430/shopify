import {
  User,
  Settings,
  LogOut,
  ShoppingBag,
  Heart,
  HelpCircle,
  CreditCard,
} from "lucide-react";

export const ProfileMenuItems = [
  {
    icon: <User className="mr-2 h-4 w-4" />,
    text: "Profile",
    action: () => {
      console.log("View Profile");
    },
  },
  {
    icon: <ShoppingBag className="mr-2 h-4 w-4" />,
    text: "My Orders",
    action: () => {
      console.log("View Orders");
    },
  },
  {
    icon: <Heart className="mr-2 h-4 w-4" />,
    text: "Wishlist",
    action: () => {
      console.log("View Wishlist");
    },
  },
  {
    icon: <CreditCard className="mr-2 h-4 w-4" />,
    text: "Payment Methods",
    action: () => {
      console.log("Manage Payments");
    },
  },
  {
    icon: <Settings className="mr-2 h-4 w-4" />,
    text: "Settings",
    action: () => {
      console.log("Open Settings");
    },
  },
  {
    icon: <HelpCircle className="mr-2 h-4 w-4" />,
    text: "Help & Support",
    action: () => {
      console.log("Open Support");
    },
  },
  {
    icon: <LogOut className="mr-2 h-4 w-4 text-red-500" />,
    text: "Log Out",
    action: () => {
      console.log("Log0ut");
    },
  },
];
