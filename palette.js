function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    // Modern API for HTTPS
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for HTTP
    let textArea = document.createElement("textarea");
    textArea.value = text;
    // Avoid scrolling to bottom
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      document.execCommand('copy') ? res() : rej();
      textArea.remove();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const colorInfo = document.getElementById('color-info');
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
      const color = this.textContent.trim();
      copyToClipboard(color).then(() => {
        // Show feedback message below the palette
        if (colorInfo) {
          colorInfo.textContent = `Copied ${color} to clipboard!`;
          colorInfo.classList.add('visible');
          setTimeout(() => {
            colorInfo.classList.remove('visible');
            colorInfo.textContent = '';
          }, 1200);
        }
        // Optional: show a tooltip on the swatch itself
        let tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = 'Copied!';
        this.appendChild(tooltip);
        setTimeout(() => {
          tooltip.remove();
        }, 800);
      }).catch(() => {
        if (colorInfo) {
          colorInfo.textContent = 'Failed to copy!';
          colorInfo.classList.add('visible');
          setTimeout(() => {
            colorInfo.classList.remove('visible');
            colorInfo.textContent = '';
          }, 1200);
        }
      });
    });
  });
});
