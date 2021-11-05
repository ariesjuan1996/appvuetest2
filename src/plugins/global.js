import { requestApi } from "@/api"
export default { 
  limitToken(val,limit){
    let value="";
    for(var i=0;i<limit;i++){
      value=value+val;
    }
    return value;
 },
  async  exportarExcel(urlPeticion) {
    
    try {
        let responseType="blob";
        let response=await requestApi(
            urlPeticion,
            {},
            "GET",
            {},
            responseType
        );
            var aLink = document.createElement("a");
            aLink.style.display = "none";
            aLink.href = url;
            document.body.appendChild(aLink)
            aLink.click();
            let blob = new Blob([response.data], {type: "application/vnd.ms-excel"});
            let url = window.URL.createObjectURL(blob);
            window.location.href = url;

        } catch (error) {
            console.log("error",error);
        }
    },
    img2xUrl(val) {
      return `${val.replace(/(\.[\w\d_-]+)$/i, '@2x$1')} 2x`;
    },
    toDataURL(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    }
  };