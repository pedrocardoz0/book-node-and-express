const fortuneCookies = [
    "Conquer",
    "Rivers",
    "Do not",
    "You will",
    "Whenever"
]

exports.getFortune = () => {
    const idx = Math.floor(Math.random() * fortuneCookies.length)
    return fortuneCookies[idx]
}