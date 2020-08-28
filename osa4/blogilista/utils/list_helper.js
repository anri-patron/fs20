const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    // noudetaan kaikki like kentät mapilla ja summataan reducella.
    return blogs.map(blog => blog.likes).reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
    // mapilla haetaan like kentän arvot ja muutetaan ne numeraalisiksi
    const likes = blogs.map(blog => parseInt(blog.likes))
    // spread syntaksin avulla voidaan antaa max funktiolle argumetiksi array ja hakea sitten indexOf:lla vastaavan olion indeksi 
    const maxIndex = likes.indexOf(Math.max(... blogs.map(blog => parseInt(blog.likes))))

    // palautetaan indeksiä vastaava olio tai NaN jos oli tyhjä array syötteenä
    if (maxIndex >= 0) {
        //const b = blogs.map(blog => blog.author).filter(a => a === blogs[maxIndex].author)
        return { "author": blogs[maxIndex].author, "blogs": blogs.map(blog => blog.author).filter(a => a === blogs[maxIndex].author).length}
    } else return NaN
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}