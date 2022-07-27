export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
}

export const routes = [
  { name: "Profile", route: "/profile" },
  { name: "FAQ", route: "/faq" },
  { name: "History", route: "/history" },
  { name: "Offers", route: "/offers" },
  { name: "Sign Out", route: "/offers" },
  /**
   * {
    name: 'History', route: '/history',
    list: [
      { name: 'Uploads', route: '/history' },
      { name: 'Coupons', route: '/history' },
    ]
  },
   */
];
export const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];


