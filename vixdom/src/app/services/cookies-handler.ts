import Cookies from "js-cookie";

export async function setAuthCookie(gymData: {}) {
  return Promise.resolve(
    Object.entries(gymData).forEach(([key, value]) => {
      Cookies.set(key, value ? value.toString() : "");
    })
  );
}

export async function clearCookies() {
  const allCookies = Cookies.get();
  const cookieNames = Object.keys(allCookies);

  await Promise.resolve(
    cookieNames.forEach((cookieName) => {
      Cookies.remove(cookieName);
    })
  );
}
