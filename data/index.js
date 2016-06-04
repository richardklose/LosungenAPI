var parser = require('xml2json');
var fs = require('fs');

Date.prototype.getMonthFormatted = function() {
    var month = parseInt(this.getMonth()) + 1;
    return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
}

Date.prototype.getDayFormatted = function() {
    var day = parseInt(this.getDate());
    return day < 10 ? '0' + day : '' + day; // ('' + month) for string result
}

module.exports = {

    get:function(year,month,day,_callback){
        var file = process.cwd()+'/data/xml/'+year+".xml";
        fs.access(file,fs.R_OK,function(err){
            if(!err){
                fs.readFile(file,'utf8',function(err,data){
                    if(!err){
                        var L = parser.toJson(data,{object:true}).FreeXml.Losungen;
                        var result = {
                            error:{
                                code:'INVDATE',
                                year:year,
                                month:month,
                                day:day
                            }
                        };
                        for(var i in L){
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
    },

    availableYears:function(_callback){
        fs.readdir(process.cwd()+'/data/xml/',function(err,files){
            if(err){
                _callback([]);
            }
            else{
                for(var i in files){
                    files[i] = files[i].replace(".xml","");
                }
                _callback(files);
            }
        });
    }
}