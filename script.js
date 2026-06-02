const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const cvDownloadLinks = document.querySelectorAll('.cv-download');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', isOpen.toString());
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

cvDownloadLinks.forEach((link) => {
  link.addEventListener('click', async (event) => {
    const fileUrl = link.getAttribute('href');
    const fileName = link.getAttribute('download') || 'cv.pdf';

    if (!fileUrl || !window.fetch || !window.URL?.createObjectURL) {
      return;
    }

    event.preventDefault();

    try {
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const fileBlob = await response.blob();
      const blobUrl = window.URL.createObjectURL(fileBlob);
      const tempLink = document.createElement('a');

      tempLink.href = blobUrl;
      tempLink.download = fileName;
      document.body.appendChild(tempLink);
      tempLink.click();
      tempLink.remove();

      window.setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 1000);
    } catch (error) {
      window.location.href = fileUrl;
    }
  });
});
