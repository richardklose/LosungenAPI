const parser = require('xml2json');
const fs = require('fs');

Date.prototype.getMonthFormatted = function() {
    const month = parseInt(this.getMonth()) + 1;
    return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
}

Date.prototype.getDayFormatted = function() {
    const day = parseInt(this.getDate());
    return day < 10 ? '0' + day : '' + day; // ('' + month) for string result
}

module.exports = {

    get:function(year,month,day,_callback){
        const file = process.cwd()+'/data/xml/'+year+".xml";
        fs.access(file,fs.R_OK,function(err){
            if(!err){
                fs.readFile(file,'utf8',function(err,data){
                    if(!err){
                        const L = parser.toJson(data,{object:true}).FreeXml.Losungen;
                        let result = {
                            error:{
                                code:'INVDATE',
                                year:year,
                                month:month,
                                day:day
                            }
                        };
                        for(const i in L){
                            if(L[i].Datum.substr(0,10) === year+'-'+month+'-'+day){
                                result = L[i];
                            }
                        }
                        _callback(result);
                    }
                    else{
                        _callback({error:err});
                    }
                });
            }
            else{
                _callback({error:err});
            }
        });
    }
}
