var parser = require('xml2json');
var fs = require('fs');

module.exports = {

    get:function(date,_callback){
        var file = process.cwd()+'/data/xml/'+date.getFullYear()+".xml";
        fs.access(file,fs.R_OK,function(err){
            if(!err){
                fs.readFile(file,'utf8',function(err,data){
                    if(!err){
                        var L = parser.toJson(data,{object:true}).FreeXml.Losungen;
                        var result = {
                            error:{code:'INVDATE'}
                        };
                        for(var i in L){
                            if(L[i].Datum.substr(0,10) === date.toISOString().substr(0,10)){
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