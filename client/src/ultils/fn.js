import { convert } from "html-to-text";
 
 export const getArrSlider = (start,end,number) =>{
    const limit = start > end ? number :end
    let output = [];
    for(let i = start; i <= limit; i++){
      output.push(i);
    }
    if(start > end){
        for(let i = 0; i <= end; i++){
            output.push(i);
        }
    }
    return output;

}
export const readingTime=(text) => {
    const wpm = 200;
    const word = text?.trim()
    const words = word.split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return `${time} min reads`;
  }

  export const  parseTextFromMarkDown= (mdString) =>{
    const options = {
        wordwrap: 200,
        // ...
      };
    const htmlString = `${mdString}`;
    const plainString = convert(htmlString, options);

    return plainString?.trim();
  }
  export const addEventOnElements = (elements, eventType, callback) => {
    for (let i = 0, len = elements.length; i < len; i++) {
      elements[i].addEventListener(eventType, callback);
    }
  };