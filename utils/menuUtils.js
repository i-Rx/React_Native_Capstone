export function addIds(menuItems) {
  let i = 1;
  return menuItems.map((item) => ({ ...item, id: i++ }));
}
