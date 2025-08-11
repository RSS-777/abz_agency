// Universal scroll function
export const handleScrollTo = (id) => {
    const element = document.getElementById(id)

    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
};