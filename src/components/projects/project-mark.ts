export type ProjectMarkShape = {
  color: string;
  size: number;
  x: number;
  y: number;
  radius: number;
  rotate: number;
};

export type ProjectMark = {
  background: string;
  shapes: ProjectMarkShape[];
};

const PROJECT_MARK_BACKGROUNDS = ["#2a2a27", "#242421", "#30302c"];
const PROJECT_MARK_COLORS = ["#fcfbf8", "#b7b0a5", "#5f5f5d", "#3a3935"];

export function createProjectMark(seed: string): ProjectMark {
  const hash = hashSeed(seed);
  const background =
    PROJECT_MARK_BACKGROUNDS[hash % PROJECT_MARK_BACKGROUNDS.length];

  return {
    background,
    shapes: [0, 1, 2].map((index) => {
      const value = hashSeed(`${seed}:${index}`);
      const size = 112 + (value % 128);

      return {
        color: PROJECT_MARK_COLORS[(value >> 3) % PROJECT_MARK_COLORS.length],
        size,
        x: 36 + ((value >> 7) % 412),
        y: 28 + ((value >> 13) % 212),
        radius: [18, 48, 999][(value >> 19) % 3],
        rotate: ((value >> 23) % 50) - 25,
      };
    }),
  };
}

function hashSeed(seed: string) {
  let hash = 2166136261;

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}
