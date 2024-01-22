export const minutesToHours = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60 < 10 ? `0${time % 60}` : time % 60;
    return `${hours}h ${minutes}m`
}