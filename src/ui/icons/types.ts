// Every icon takes the same two knobs: a pixel size and a stroke/fill colour.
// Screens pass a colour from the theme, never a literal.
export interface IconProps {
  size?: number;
  color?: string;
}
