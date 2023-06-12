
const sectionConteudo = document.querySelector(".conteudo")

fetch("produtosImagen.json").then((response) => {
    response.json().then((dados) => {
        let imageBanner = dados.banner
        document.querySelector('#section-banner').style.width = `calc(100vw * ${imageBanner.length})`;
        for (let i = 0; i < imageBanner.length; i++) {
            document.querySelector('#section-banner').innerHTML += `<div class="banner img-area"><img src="${imageBanner[i]}"></div>`
        }

        let banner = document.querySelector('.banner').clientWidth
        let imgmove = 0;
        let totalImg;

        function mudarImg() {
            imgmove++
            if (imgmove >= imageBanner.length) {
                imgmove = 0;
                document.querySelector('#section-banner').style.marginLeft = "0px";
                document.querySelector('#section-banner').style.transition = "all ease 0s";
            } else {
                totalImg = imgmove * banner;
                document.querySelector('#section-banner').style.transition = "all ease 0.5s";
                document.querySelector('#section-banner').style.marginLeft = `-${totalImg}px`;
            }

        }

        const pararInterval = setInterval(mudarImg, 3000);
        document.querySelector("#button-img-left").addEventListener("click", () => {
            if (imgmove => 0 & imgmove < imageBanner.length) {
                imgmove -= 1
                totalImg = imgmove * banner;
                document.querySelector('#section-banner').style.marginLeft = `-${totalImg}px`;
                clearInterval(pararInterval)
            }
        })
        document.querySelector("#button-img-right").addEventListener("click", () => {
            if (imgmove => 0 & imgmove < imageBanner.length) {
                clearInterval(mudarImg())
                clearInterval(pararInterval)
            }
        })

        dados.lista.map((itens) => {
            let imagenDesc = "";

            for (let item = 0; item < itens.produto.length; item++) {
                let imgProduto = itens.produto[item]

                imagenDesc += `
            <div class="area-produto" style="grid-area: ${imgProduto.areaGrid};">
                        <div class="imagen " style="background-image: url('${imgProduto.img}');"></div>
                        <div class="descricao">${imgProduto.descricao}</div>
                    </div>`
            }

            document.querySelector("#section-conteudo-maior").innerHTML += ` <section class="conteudo-maior">
                <h2>${itens.title}</h2>
                <div class="produtos ${itens.tipo}">${imagenDesc}</div>
               <div><a href="#" class="link">${itens.link}</a></div> 
            </section>`



        })

        dados.conteudoMenor.map((itens) => {
            let dadosCategorias = "";
            for (let i = 0; i < itens.images.length; i++) {
                dadosCategorias += `<section class="conteudo-menor"><img src="${itens.images[i]}"></section>`
            }
            document.querySelectorAll(".container").forEach((i) => {
                if (i.getAttribute("data-categoria") == itens.nomeSection) {
                    document.querySelector(".container").innerHTML += ` 
                <section class="section-conteudo-menor" data-areaCategoria="${itens.nomeSection}">
                    <div class="title-conteudo">
                        <span>${itens.title}</span>
                    </div>
                    <div class="button-scroll-conteudo-left button-scroll" data-buttonleft="${itens.nomeSection}">
                        <div class="seta"></div>
                    </div>
                    <div class="button-scroll-conteudo-rigth button-scroll" data-buttonRigth="${itens.nomeSection}">
                        <div class="seta"></div>
                    </div>
                    <section class="area-conteudo-menor" id="${itens.nomeSection}">${dadosCategorias}</section>
            </section>`
                    document.querySelector(".container").style.margin = "15px 20px";

                    document.querySelectorAll(".button-scroll-conteudo-left").forEach((i) => {
                        i.addEventListener("click", (event) => {

                            let button = event.currentTarget.getAttribute("data-buttonleft")

                            let width = document.querySelector(".area-conteudo-menor").scrollWidth
                            document.querySelector(`#${button}`).scrollBy(-(width * 0.15), 0)

                        })
                    })
                    document.querySelectorAll(".button-scroll-conteudo-rigth").forEach((i) => {
                        i.addEventListener("click", (event) => {

                            let button = event.currentTarget.getAttribute("data-buttonRigth")

                            let width = document.querySelector(".area-conteudo-menor").scrollWidth
                            document.querySelector(`#${button}`).scrollBy(width * 0.15, 0)
                            
                        })
                    })



                }
            })

        })

    })
})



let mostrarSection = false
document.querySelectorAll(".clickMostrar").forEach((itens) => {
    itens.addEventListener("click", (e) => {
        if (mostrarSection === false) {
            mostrarSection = true;
            e.currentTarget.querySelector(".mostrarSection").style.display = "flex"
            e.currentTarget.querySelector(".pesquisa-todos").style.border = "3px solid orange"
        } else {
            mostrarSection = false;
            e.currentTarget.querySelector(".pesquisa-todos").style.border = "none"
            e.currentTarget.querySelector(".mostrarSection").style.display = "none"
        }

    })
})

document.querySelector(".todos").addEventListener("click", () => {
    document.querySelector("#menuTodos").style.display = "flex"
    document.querySelector("body").style.overflowY = "hidden";
    setTimeout(() => {
        document.querySelector("#menuTodos").style.opacity = "1";
        document.querySelector("#areamenuTodos").style.transform = "translateX(0px)";
    }, 200)
})
document.querySelector("#fecharMenu").addEventListener("click", () => {
    document.querySelector("#menuTodos").style.opacity = "0";
    document.querySelector("#areamenuTodos").style.transform = "translateX(-450px)";
    setTimeout(() => {
        document.querySelector("#menuTodos").style.display = "none"
        document.querySelector("body").style.overflowY = "scroll";
    }, 200)

})

document.querySelectorAll(".display-flex").forEach((i) => {
    i.addEventListener("mouseover", (e) => {
        e.currentTarget.querySelector(".display-none").style.display = "block"
    })
    i.addEventListener("mouseout", (e) => {
        e.currentTarget.querySelector(".display-none").style.display = "none"
    })
})
document.querySelectorAll(".itemSeviços").forEach((i) => {
    i.addEventListener("mouseover", (e) => {
        e.currentTarget.querySelector(".setaDireita").style.boxShadow = "1px 1px 0px 1px rgba(0, 0, 0, 0.829)";
    })
    i.addEventListener("mouseleave", (e) => {
        i.querySelector(".setaDireita").style.boxShadow = "1px 1px 0px 1px rgba(0, 0, 0, 0.575)";
    })
})
