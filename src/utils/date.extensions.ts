declare global {
  interface Date {
    toYMD(): string;
    toDL(): string;
    toDLY(): string;
  }
}

const pad = (num: number) => `00${num}`.slice(-2);

const formatter = Intl.DateTimeFormat("en-US", {
  month: "short",
});

Date.prototype.toYMD = function () {
  const y = this.getFullYear();
  const m = pad(this.getMonth() + 1);
  const d = pad(this.getDate());
  return `${y}-${m}-${d}`;
};

Date.prototype.toDL = function () {
  const d = pad(this.getDate());
  const m = formatter.format(this);
  return `${d} ${m}`;
};

Date.prototype.toDLY = function () {
  const d = pad(this.getDate());
  const m = formatter.format(this);
  const y = this.getFullYear();
  return `${d} ${m} ${y}`;
};

export {};
