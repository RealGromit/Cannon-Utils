export default function addSidebarEvents() {
    const bars = document.querySelector(".navbar-bars");
    const sidebar = document.querySelector(".sidebar");
    const buttons = sidebar.querySelectorAll(".button");
    const wrapper = sidebar.querySelectorAll(".wrapper");
    const wrapper1 = sidebar.querySelectorAll(".wrapper1");
    const mainDiv = document.querySelector(".main");

    buttons.forEach(button => {
        button.classList.add("hide");
    });

    wrapper1.forEach(wrapper => {
        wrapper.classList.add("hide");
    });

    sidebar.classList.add("collapse");

    var state = false;
    bars.addEventListener("click", () => {
        state = !state;
        state ? onFalse(sidebar, buttons, mainDiv) : onTrue(sidebar, wrapper1, buttons, mainDiv);
    });

    wrapper.forEach(wrapper => {
        const bigButton = wrapper.querySelector(".sidebar-button");
        const wrapper1 = wrapper.querySelector(".wrapper1");

        bigButton.addEventListener("click", () => {
            if (sidebar.classList.contains("collapse")) {
                sidebar.classList.remove("collapse");
                mainDiv.classList.add("collapseMain");
                setTimeout(() => {
                    buttons.forEach(button => {
                        button.classList.remove("hide");
                    });
                    if (wrapper1 !== null) wrapper1.classList.toggle("hide");
                }, 200);
            } else if (wrapper1 !== null) wrapper1.classList.toggle("hide");
        });
    })
}

function onTrue(sidebar, wrapper1, buttons, mainDiv) {
    sidebar.classList.add("collapse");
    mainDiv.classList.remove("collapseMain");
    wrapper1.forEach(button => {
        button.classList.add("hide");
    });
    buttons.forEach(button => {
        button.classList.add("hide");
    });
    setTimeout(() => {
        buttons.forEach(button => {
            button.classList.add("hide");
        });
    }, 20);
}

function onFalse(sidebar, buttons, mainDiv) {
    sidebar.classList.remove("collapse");
    mainDiv.classList.add("collapseMain");
    setTimeout(() => {
        if (sidebar.clientWidth === 191) {
            buttons.forEach(button => {
                button.classList.remove("hide");
            });
        }
    }, 200);
}