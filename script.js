const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


gsap.registerPlugin(Flip, CustomEase, ScrollToPlugin)

// CustomEase.create(
//     "hop",
//     "MO, 0 C0.028, 0.528 0.129, 0.74 0.27, 0.852 0.415, 0.967 0.499, 1 1, 1"
// );
CustomEase.create(
    "hop",
    "M0,0 C0.028,0.528 0.129,0.74 0.27,0.852 0.415,0.967 0.499,1 1,1"
);



const items = document.querySelectorAll("nav .nav-item p");
const gallary = document.querySelector(".gallary");
const gallaryContainer = document.querySelector(".gallary-container");
const imgPreviews  = document.querySelector(".img-previews");
const minimap = document.querySelector(".minimap")


let activeLayout = "layout-1-gallary";

function switchLayout(newLayout){
    if(newLayout === activeLayout) return;

    if(activeLayout === "layout-2-gallary" && window.scrollY > 0){
        gsap.to(window, {
            scrollTo: { y: 0},
            duration: 0.5,
            ease: "power3.out",
            onComplete: () => switchLayoutHandler(newLayout),
        });
    } else {
        switchLayoutHandler(newLayout)
    }
}

function switchLayoutHandler(newLayout){
    const state = Flip.getState(gallary.querySelectorAll(".img"));

    gallary.classList.remove(activeLayout);
    gallary.classList.add(newLayout);

    let staggerValue = 0.025;
    if(
        (activeLayout === "layout-1-gallary" && newLayout === "layout-2-gallary") ||
        (activeLayout === "layout-3-gallary" && newLayout === "layout-2-gallary")
    ){
        staggerValue = 0;
    }

    Flip.from(state, {
        duration: 1.5,
        ease: "hop",
        stagger: staggerValue,
    });

    activeLayout = newLayout;

    if(newLayout === "layout-2-gallary"){
        gsap.to([imgPreviews, minimap], {
            autoAlpha: 1,
            duration: 0.3,
            delay: 0.5,
        });
        window.addEventListener("scroll", handleScroll);
    } else{
        gsap.to([imgPreviews, minimap], {
            autoAlpha: 0,
            duration: 0.3,
        });
        window.removeEventListener("scroll", handleScroll);
        gsap.set(gallary, { clearProps: "y" });
        gsap.set(minimap, { clearProps: "y" });
    }


    items.forEach((item) => {
        item.classList.toggle("active", item.id === newLayout);
    });
}

items.forEach((item) => {
    item.addEventListener("click", () => {
        if(!item.id) return;
        const newLayout = item.id;
        switchLayout(newLayout);
    })
})


window.addEventListener("load", () => {
    if (activeLayout === "layout-2-gallary") {
        handleScroll();
    } else {
        gsap.set([imgPreviews, minimap], { autoAlpha: 0 });
    }
});

function handleScroll() {
    if (activeLayout !== "layout-2-gallary") return;

    const imgPreviewsHeight = imgPreviews.scrollHeight;
    const gallaryHeight = gallary.scrollHeight;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    if (imgPreviewsHeight <= windowHeight) return;

    const scrollFraction = scrollY / (imgPreviewsHeight - windowHeight);
    const gallaryTranslateY = -scrollFraction * (gallaryHeight - windowHeight) * 1.525;
    const minimapTranslateY = scrollFraction * (windowHeight - minimap.offsetHeight) * 0.425;

    gsap.to(gallary, {
        y: gallaryTranslateY,
        ease: "none",
        duration: 0.1,
    });

    gsap.to(minimap, {
        y: minimapTranslateY,
        ease: "none",
        duration: 0.1,
    });
}


// function handleScroll(){
//     if(activeLayout != "layout-2-gallary") return;

//     const imgPreviewsHeight = imgPreviews.scrollHeight;
//     const gallaryHeight = gallary.scrollHeight;
//     const scrollY = window.scrollY;
//     const windowHeight = window.innerHeight;


//     const scrollFraction = scrollY / (imgPreviewsHeight - windowHeight)
//     const gallaryTranslateY = 
//       -scrollFraction * (gallaryHeight - windowHeight) * 1.525;
//     const minimapTranslateY = 
//       scrollFraction * (windowHeight - minimap.offsetHeight) * 0.425;
      
      

//     gsap.to(gallary, {
//         y: gallaryTranslateY,
//         ease: "none",
//         duration: 0.1,
//     });
    
//     gsap.to(minimap, {
//         y: minimapTranslateY,
//         ease: "none",
//         duration: 0.1,

//     })
// }


// window.addEventListener("load", () => {
//     if(activeLayout === "layout-2-gallary"){
//         handleScroll()
//     }
// })

// function handleScroll() {
//     if (activeLayout !== "layout-2-gallary") return;

//     const imgPreviewsHeight = imgPreviews.scrollHeight;
//     const gallaryHeight = gallary.scrollHeight;
//     const scrollY = window.scrollY;
//     const windowHeight = window.innerHeight;

//     if (imgPreviewsHeight <= windowHeight) return;

//     const scrollFraction = scrollY / (imgPreviewsHeight - windowHeight);
//     const gallaryTranslateY = -scrollFraction * (gallaryHeight - windowHeight) * 1.525;
//     const minimapTranslateY = scrollFraction * (windowHeight - minimap.offsetHeight) * 0.425;

//     gsap.to(gallary, {
//         y: gallaryTranslateY,
//         ease: "none",
//         duration: 0.1,
//     });

//     gsap.to(minimap, {
//         y: minimapTranslateY,
//         ease: "none",
//         duration: 0.1,
//     });
// }



// window.addEventListener("load", () => {
//     if (activeLayout === "layout-2-gallary") {
//         handleScroll();
//     } else {
//         gsap.set([imgPreviews, minimap], { autoAlpha: 0 });
//     }
// });

 