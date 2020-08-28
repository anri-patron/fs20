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
        return {"title": blogs[maxIndex].title, "author": blogs[maxIndex].author, "likes": blogs[maxIndex].likes}
    } else return NaN
}

const mostBlogs = (blogs) => {
    // jos saadaan tyhjä joukko palautetaan undefined
    if (blogs.length === 0) return undefined
    // haetaan kaikkien kirjoittajien kentät
    const authors = blogs.map(blog => blog.author)
    // filteröidään duplikaatit pois
    const unique = authors.filter((author, i, array) => array.indexOf(author) === i);
    let blogCount = []
    // lasketaan blogien lukumäärät jokaiselle kirjoittajalle
    unique.forEach(e => blogCount.push(authors.filter(a => a === e).length))
    const mostIndex = blogCount.indexOf(Math.max(...blogCount))
    // palautetaan tiedot kirjoittajasta jolla oli eniten blogeja
    return {"author": unique[mostIndex], "blogs": blogCount[mostIndex]}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}