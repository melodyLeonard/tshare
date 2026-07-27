// The app ships a dark UI. These tokens are the only place colours, spacing,
// radii and type sizes are defined; components read from here, never literals.

export const color = {
  bg: '#0b0f16',
  panel: '#141b26',
  elevated: '#1c2531',
  line: '#26303f',
  ink: '#eaf0f7',
  muted: '#7f8b9c',
  send: '#ff6a45', // action, sending
  link: '#21c9b0', // connected, verified
  onSend: '#ffffff',
};

export const space = { xs: 6, sm: 10, md: 14, lg: 20, xl: 28 };

export const radius = { sm: 8, md: 13, lg: 16, xl: 22, pill: 999 };

export const type = {
  h1: 30,
  h2: 20,
  body: 15,
  label: 13,
  small: 11,
  mono: 'Menlo',
};
