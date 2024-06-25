export const Mark6_Main = (item: any) => {
  const colorMap: { [key: string]: string } = {
    Rat: "red",
    Ox: "red",
    Tiger: "blue",
    Rabbit: "blue",
    Dragon: "green",
    Snake: "green",
    Horse: "red",
    Goat: "red",
    Monkey: "blue",
    Rooster: "blue",
    Dog: "green",
    Pig: "red",
    Big: "red",
    Small: "#0088FF",
    Odd: "#6D00CC",
    Even: "#43CC00",
    Wind: "#49d174",
    Fire: "red",
    Thunder: "#a30014",
    Light: "#49d174",
  }

  if (typeof item === "string") {
    return colorMap[item] || "gray"
  } else {
    return "gray"
  }
}
