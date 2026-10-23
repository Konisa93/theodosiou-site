// Turns the encoded email links (components/Email.astro) into real mailto: links.

export const decodeEmail = (encoded) => [...atob(encoded)].reverse().join('');

export function initEmails(root = document) {
  root.querySelectorAll('a[data-e]').forEach((a) => {
    const email = decodeEmail(a.dataset.e);
    a.href = `mailto:${email}`;
    a.textContent = email;
  });
}
