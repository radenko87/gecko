export default class Slider {
    constructor(element) {


        
        this.dragStart = this.dragStart.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.dragAction = this.dragAction.bind(this);
        this.checkIndex = this.checkIndex.bind(this);
        this.shiftSlide = this.shiftSlide.bind(this);
        this.wrapper = element;
        let id = this.wrapper.getAttribute('id');
        let slidesToShow = this.wrapper.getAttribute("slides-to-show") ? this.wrapper.getAttribute("slides-to-show") : 1;
        if (window.innerWidth < 768 && this.wrapper.getAttribute("mobile-slides-to-show")){
            slidesToShow = this.wrapper.getAttribute("mobile-slides-to-show");
        }
        if (window.innerWidth >= 768 && window.innerWidth < 1200 && this.wrapper.getAttribute("tablet-slides-to-show")){
            slidesToShow = this.wrapper.getAttribute("tablet-slides-to-show");
        }
        let sliderWidth = this.wrapper.offsetWidth;


        let css = '.slider-wrap {overflow: hidden;position: relative;width: 100%;height: 100%;z-index: 1;} #'+id+' .slider-track {display: flex;position: relative;top: 0;left: -'+parseInt(sliderWidth / slidesToShow)+'px;width: 10000px;}.slider-track.shifting {transition: left .2s ease-out;} #'+id+' .slider-item {width: '+parseInt(sliderWidth / slidesToShow)+'px;height: 100%;cursor: pointer;display: flex;flex-direction: column;justify-content: center;position: relative;}';

        let style = document.createElement('style');
        style.setAttribute('data-name', 'slider-css');
        style.innerHTML = css;
        document.getElementsByTagName('head')[0].appendChild(style);


        this.items = this.wrapper.getElementsByClassName('slider-track')[0];
        this.items.style.left = -parseInt(sliderWidth / slidesToShow) + 'px'
        let buttons = this.wrapper.getElementsByClassName('button-control');

        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].getAttribute('control') == 'next') {
                this.next = buttons[i];
            }

            if (buttons[i].getAttribute('control') == 'prev') {
                this.prev = buttons[i];
            }

        }

        this.posX1 = 0;
        this.posX2 = 0;
        this.posInitial;
        this.posFinal;
        this.threshold = 100;
        this.slides = this.items.getElementsByClassName('slider-item');
        this.slidesLength = this.slides.length;
        this.slideSize = this.items.getElementsByClassName('slider-item')[0].offsetWidth;
        this.firstSlide = this.slides[0];
        this.lastSlide = this.slides[this.slidesLength - 1];
        this.cloneFirst = this.firstSlide.cloneNode(true);
        this.cloneLast = this.lastSlide.cloneNode(true);

        this.cloneFirst.setAttribute('clone', "true");
        this.cloneLast.setAttribute('clone', "true");

        this.index = 0;
        this.allowShift = true;


        // Clone first and last slide
        this.items.appendChild(this.cloneFirst);
        this.items.insertBefore(this.cloneLast, this.firstSlide);
        this.wrapper.classList.add('loaded');

        // Mouse events
        this.items.onmousedown = this.dragStart;

        // Touch events
        this.items.addEventListener('touchstart', this.dragStart);
        this.items.addEventListener('touchend', this.dragEnd);
        this.items.addEventListener('touchmove', this.dragAction);

        // Click events
        this.prev.addEventListener('click', () => { this.shiftSlide(-1) });
        this.next.addEventListener('click', () => { this.shiftSlide(1) });

        // Transition events
        this.items.addEventListener('transitionend', this.checkIndex);

        if (this.wrapper.getAttribute('autoplay')) {
            setInterval(() => {
                this.shiftSlide(1);
            }, this.wrapper.getAttribute('autoplay-speed') ? parseInt(this.wrapper.getAttribute('autoplay-speed')) : 3000);
        }

    }



    dragStart(e) {
        e = e || window.event;
        e.preventDefault();
        this.posInitial = this.items.offsetLeft;

        if (e.type == 'touchstart') {
            this.posX1 = e.touches[0].clientX;
        } else {
            this.posX1 = e.clientX;
            document.onmouseup = this.dragEnd;
            document.onmousemove = this.dragAction;
        }
    }

    dragAction(e) {
        e = e || window.event;

        if (e.type == 'touchmove') {
            this.posX2 = this.posX1 - e.touches[0].clientX;
            this.posX1 = e.touches[0].clientX;
        } else {
            this.posX2 = this.posX1 - e.clientX;
            this.posX1 = e.clientX;
        }
        this.items.style.left = (this.items.offsetLeft - this.posX2) + "px";
    }

    dragEnd(e) {
        this.posFinal = this.items.offsetLeft;
        if (this.posFinal - this.posInitial < -this.threshold) {
            this.shiftSlide(1, 'drag');
        } else if (this.posFinal - this.posInitial > this.threshold) {
            this.shiftSlide(-1, 'drag');
        } else {
            this.items.style.left = (this.posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    shiftSlide(dir, action) {
        this.items.classList.add('shifting');

        if (this.allowShift) {
            if (!action) { this.posInitial = this.items.offsetLeft; }

            if (dir == 1) {
                this.items.style.left = (this.posInitial - this.slideSize) + "px";
                this.index++;
            } else if (dir == -1) {
                this.items.style.left = (this.posInitial + this.slideSize) + "px";
                this.index--;
            }
        };

        this.allowShift = false;
    }

    checkIndex() {
        this.items.classList.remove('shifting');
        console.log(this.index);


        if (this.index == -1) {
            this.items.style.left = -(this.slidesLength * this.slideSize) + "px";
            this.index = this.slidesLength - 1;
        }

        if (this.index == this.slidesLength) {
            this.items.style.left = -(1 * this.slideSize) + "px";
            this.index = 0;
        }

        this.allowShift = true;
    }
}