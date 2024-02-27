function random(diviation){
    return (Math.random()*2-1)*diviation
}

function set_colors(selector, hue, saturation, lightness, hue_max_diviation=20, saturation_max_deviation=5, lightness_max_deviation=5) {
    Array.from(document.querySelectorAll(selector)).map(element=>{
        hue_fluctuation=random(hue_max_diviation)
        saturation_fluctuation=random(saturation_max_deviation)
        lightness_fluctuation=random(lightness_max_deviation)
        hue_for_element = hue+hue_fluctuation
        hue_for_element = hue_for_element > 0 ? hue_for_element : hue_for_element + 360
        hue_for_element = hue_for_element < 360 ? hue_for_element : hue_for_element - 360
        saturation_for_element = saturation+saturation_fluctuation
        saturation_for_element = saturation_for_element > 0 ? saturation_for_element : 0
        saturation_for_element = saturation_for_element < 100 ? saturation_for_element : 100
        lightness_for_element = lightness+lightness_fluctuation
        lightness_for_element = lightness_for_element > 0 ? lightness_for_element : 0
        lightness_for_element = lightness_for_element < 100 ? lightness_for_element : 100
        element.style.color = "hsl("+(hue_for_element)+","+(saturation_for_element)+"%,"+(lightness_for_element)+"%)"
    })
}

function set_stroke_colors(selector, hue, saturation, lightness, hue_max_diviation=0, saturation_max_deviation=0, lightness_max_deviation=0) {
    Array.from(document.querySelectorAll(selector)).map(element=>{
        hue_fluctuation=random(hue_max_diviation)
        saturation_fluctuation=random(saturation_max_deviation)
        lightness_fluctuation=random(lightness_max_deviation)
        hue_for_element = hue+hue_fluctuation
        hue_for_element = hue_for_element > 0 ? hue_for_element : hue_for_element + 360
        hue_for_element = hue_for_element < 360 ? hue_for_element : hue_for_element - 360
        saturation_for_element = saturation+saturation_fluctuation
        saturation_for_element = saturation_for_element > 0 ? saturation_for_element : 0
        saturation_for_element = saturation_for_element < 100 ? saturation_for_element : 100
        lightness_for_element = lightness+lightness_fluctuation
        lightness_for_element = lightness_for_element > 0 ? lightness_for_element : 0
        lightness_for_element = lightness_for_element < 100 ? lightness_for_element : 100
        element.style.stroke = "hsl("+(hue_for_element)+","+(saturation_for_element)+"%,"+(lightness_for_element)+"%)"
    })
}

function set_background_colors(selector, hue, saturation, lightness, hue_max_diviation=20, saturation_max_deviation=5, lightness_max_deviation=5) {
    Array.from(document.querySelectorAll(selector)).map(element=>{
        hue_fluctuation=random(hue_max_diviation)
        saturation_fluctuation=random(saturation_max_deviation)
        lightness_fluctuation=random(lightness_max_deviation)
        hue_for_element = hue+hue_fluctuation
        hue_for_element = hue_for_element > 0 ? hue_for_element : hue_for_element + 360
        hue_for_element = hue_for_element < 360 ? hue_for_element : hue_for_element - 360
        saturation_for_element = saturation+saturation_fluctuation
        saturation_for_element = saturation_for_element > 0 ? saturation_for_element : 0
        saturation_for_element = saturation_for_element < 100 ? saturation_for_element : 100
        lightness_for_element = lightness+lightness_fluctuation
        lightness_for_element = lightness_for_element > 0 ? lightness_for_element : 0
        lightness_for_element = lightness_for_element < 100 ? lightness_for_element : 100
        element.style.backgroundColor = "hsl("+(hue_for_element)+","+(saturation_for_element)+"%,"+(lightness_for_element)+"%)"
    })
}

let change_color_id=0;

function set_colors_with_another_selector(querySelector, selectorOfStyle, hue, saturation, lightness, hue_max_diviation=20, saturation_max_deviation=5, lightness_max_deviation=5) {var css = 'table td:hover{ background-color: #00ff00 }';
    var style = document.createElement('style');
    var css = ""
    Array.from(document.querySelectorAll(querySelector)).map(element=>{
        hue_fluctuation=random(hue_max_diviation)
        saturation_fluctuation=random(saturation_max_deviation)
        lightness_fluctuation=random(lightness_max_deviation)
        hue_for_element = hue+hue_fluctuation
        hue_for_element = hue_for_element > 0 ? hue_for_element : hue_for_element + 360
        hue_for_element = hue_for_element < 360 ? hue_for_element : hue_for_element - 360
        saturation_for_element = saturation+saturation_fluctuation
        saturation_for_element = saturation_for_element > 0 ? saturation_for_element : 0
        saturation_for_element = saturation_for_element < 100 ? saturation_for_element : 100
        lightness_for_element = lightness+lightness_fluctuation
        lightness_for_element = lightness_for_element > 0 ? lightness_for_element : 0
        lightness_for_element = lightness_for_element < 100 ? lightness_for_element : 100
        element.classList.add("change_color_id"+change_color_id)
        css += selectorOfStyle+".change_color_id"+change_color_id+" { color:" + "hsl("+(hue_for_element)+","+(saturation_for_element)+"%,"+(lightness_for_element)+"%)" + "}"
        change_color_id += 1
    })

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);
}

function set_stroke_colors_with_another_selector(querySelector, selectorOfStyle, hue, saturation, lightness, hue_max_diviation=0, saturation_max_deviation=0, lightness_max_deviation=0) {
    var style = document.createElement('style');
    var css = ""
    Array.from(document.querySelectorAll(querySelector)).map(element=>{
        hue_fluctuation=random(hue_max_diviation)
        saturation_fluctuation=random(saturation_max_deviation)
        lightness_fluctuation=random(lightness_max_deviation)
        hue_for_element = hue+hue_fluctuation
        hue_for_element = hue_for_element > 0 ? hue_for_element : hue_for_element + 360
        hue_for_element = hue_for_element < 360 ? hue_for_element : hue_for_element - 360
        saturation_for_element = saturation+saturation_fluctuation
        saturation_for_element = saturation_for_element > 0 ? saturation_for_element : 0
        saturation_for_element = saturation_for_element < 100 ? saturation_for_element : 100
        lightness_for_element = lightness+lightness_fluctuation
        lightness_for_element = lightness_for_element > 0 ? lightness_for_element : 0
        lightness_for_element = lightness_for_element < 100 ? lightness_for_element : 100
        element.classList.add("change_color_id"+change_color_id)
        css += selectorOfStyle+".change_color_id"+change_color_id+" { stroke:" + "hsl("+(hue_for_element)+","+(saturation_for_element)+"%,"+(lightness_for_element)+"%)" + "}"
        change_color_id += 1
    })

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);
}

function set_background_colors_with_another_selector(querySelector, selectorOfStyle, hue, saturation, lightness, hue_max_diviation=20, saturation_max_deviation=5, lightness_max_deviation=5) {
    var style = document.createElement('style');
    var css = ""
    Array.from(document.querySelectorAll(querySelector)).map(element=>{
        hue_fluctuation=random(hue_max_diviation)
        saturation_fluctuation=random(saturation_max_deviation)
        lightness_fluctuation=random(lightness_max_deviation)
        hue_for_element = hue+hue_fluctuation
        hue_for_element = hue_for_element > 0 ? hue_for_element : hue_for_element + 360
        hue_for_element = hue_for_element < 360 ? hue_for_element : hue_for_element - 360
        saturation_for_element = saturation+saturation_fluctuation
        saturation_for_element = saturation_for_element > 0 ? saturation_for_element : 0
        saturation_for_element = saturation_for_element < 100 ? saturation_for_element : 100
        lightness_for_element = lightness+lightness_fluctuation
        lightness_for_element = lightness_for_element > 0 ? lightness_for_element : 0
        lightness_for_element = lightness_for_element < 100 ? lightness_for_element : 100
        element.classList.add("change_color_id"+change_color_id)
        css += selectorOfStyle+".change_color_id"+change_color_id+" { background-color:" + "hsl("+(hue_for_element)+","+(saturation_for_element)+"%,"+(lightness_for_element)+"%)" + "}"
        change_color_id += 1
    })

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);
}