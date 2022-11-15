export function shuffle(arr: number[], ref: React.MutableRefObject<number | null> | null = null) {
    const index = Math.floor(Math.random() * arr.length)
    if (ref) ref!.current = index;
    arr.splice(index, 1)
    const shuffledArr = [
        ...arr.sort(() => Math.random() - 0.5),
    ];
    shuffledArr.splice(index, 0, index)
    return shuffledArr
}