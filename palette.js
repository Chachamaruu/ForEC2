document.addEventListener('DOMContentLoaded', () => {
  const colorInfo = document.getElementById('color-info');
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
      const color = this.textContent.trim();
      navigator.clipboard.writeText(color).then(() => {

        colorInfo.textContent = `Copied ${color} to clipboard!`;
        colorInfo.classList.add('visible');
        setTimeout(() => {
          colorInfo.classList.remove('visible');
          colorInfo.textContent = '';
        }, 1200);

        
        let tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = 'Copied!';
        this.appendChild(tooltip);
        setTimeout(() => {
          tooltip.remove();
        }, 800);
      }).catch(err => {
        colorInfo.textContent = 'Failed to copy!';
        colorInfo.classList.add('visible');
        setTimeout(() => {
          colorInfo.classList.remove('visible');
          colorInfo.textContent = '';
        }, 1200);
        console.error(err);
      });
    });
  });
});
