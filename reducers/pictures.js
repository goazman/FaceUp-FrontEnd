export default function(picture = [], action) {
    if(action.type == 'savePic') {
        var displayPic = [... picture];
        displayPic.push(action.urlToReducer)
        // console.log(displayPic, "REDUX INFO");
        return displayPic;
    } else {
        return picture;
    }
}