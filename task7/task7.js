
(function(){

  class adCollection{
    _adList;

    constructor(){
      this._adList = new Array();
    }
    // заменить switch на if-else
    validate(object){
      for(let property in object){
        if(property == 'id') {
          if (object[property] == undefined || object[property] == '' || (object[property] instanceof String == false)) {
            return false;
          }
          if (this._adList != undefined) {
            for (let token of this._adList) {
              if (token.id == object[property]) {
                return false;
              }
            }
          }
          break;
        }
         if (property == 'description') {
           if (object[property] == undefined || object[property] >= 200 || object[property] == '' || (object[property] instanceof String == false)) {
             return false;
           }
           break;
         }
          if ( property == 'createdAt') {
            if (object[property] == undefined || object[property] == '' || isNaN(object[property]) == true || (object[property] instanceof String == true)) {
              return false;
            }
            break;
          }
          if(property == 'validUntil') {
            if (object[property] == undefined || object[property] == '' || isNaN(object[property]) == true || (object[property] instanceof String == true)) {
              return false;
            }
            break;
          }
          if( property == 'link') {
            if (object[property] == undefined || object[property] == '' || (object[property] instanceof String == false)) {
              return false;
            }
            break;
          }
          if(property == 'vendor') {
            if (object[property] == undefined || object[property] == '' || (object[property] instanceof String == false)) {
              return false;
            }
            break;
          }
          if(property ==  'photoLink') {
            if (object[property] != undefined && (object[property] instanceof String == false)) {
              return false;
            }
            break;
          }
          if(property ==  'hashTags') {
            if (object[property] == undefined || Array.isArray(object[property]) == false || object[property].length == 0) {
              return false;
            }
            for (let token of object[property]) {
              if (token == '') {
                return false;
              }
            }
            break;
          }
          if(property ==  'discount') {
            if (object[property] == undefined || object[property] == '' || (object[property] instanceof String == false)) {
              return false;
            }
            break;
          }
          if(property ==  'rating') {
            if (object[property] != undefined && (object[property] instanceof Number == false)) {
              return false;
            }
            break;
          }
          if(property ==  'reviews') {
            if (object[property] != undefined && Array.isArray(object[property]) == false) {
              return false;
            }
            break;
          }
      }
      return true;
    }

    add(object){
      if(this.validate(object) == true){
        this._adList.push(object);
        return true;
      }else{
        return false;
      }
    }

    addAll(object){
      let result = [];
      for(let item of object){
        if(this.validate(item) == true){
          this.add(item);
        }else{
          result.push(item);
        }
      }
      return result;
    }

    get(id){
      for(let item of this._adList){
        if(item.id == id){
          return item;
        }
      }
      return null;
    }

    edit(id, object){
      let item;
      let index = -1;
      for(let i = 0; i < this._adList.length; i++){
        if(this._adList[i].id == id){
          index = i;
          item = this._adList[i];
          break;
        }
      }
      if(index == -1){
        return false;
      }
      let copy_item = item;
      for(let property in object){
        if(property != 'id' ){
          if(property != 'vendor'){
            if(property != 'createdAt'){
              if(object[property] != undefined){
                item[property] = object[property];
              }
            }
          }
        }
      }
      this._adList.splice(index, 1);
      if(this.validate(item) == true){
        this._adList.splice(index, 0, item);
        return true;
      }else{
        this._adList.splice(index, 0, copy_item);
        return false;
      }
    }

    remove(id){
      if(this.get(id) !== null){
        for(let i = 0; i < this._adList.length; i++){
          if(this._adList[i].id == id){
            this._adList.splice(i, 1);
            return true;
          }
        }
      }else{
        return false;
      }
    }

    #filterConfiguration(object, item){
      if(object == undefined){
        return true;
      }else{
        for(let property in object){
          if(object[property] != item[property]){
            return false;
          }
        }
        return true;
      }
    }

    getPage(skip = 0, top = 10, object = undefined){
      return this._adList.filter(item => this.#filterConfiguration(object, item)).slice(skip, (skip + top)).sort( (a, b) => a.createdAt - b.createdAt);
    }

    clear(){
      this._adList.splice(0, this._adList.length);
      this._adList.splice(0, this._adList.length);
    }
  }

  class adItem{
    id;
    description;
    createdAt;
    link;
    vendor;
    photoLink;
    hashTags;
    discount;
    validUntil;
    rating;
    rewiews;

    constructor(id = undefined, description = undefined, createdAt = undefined, link = undefined,
                vendor = undefined, photoLink = undefined, hashTags = undefined, discount = undefined,
                validUntil = undefined, rating, rewiews = undefined){
      this.id = id;
      this.description = description;
      this.createdAt = createdAt;
      this.link = link;
      this.vendor = vendor;
      this.photoLink = photoLink;
      this.hashTags = hashTags;
      this.discount = discount;
      this.validUntil = validUntil;
      this.rating = rating;
      this.rewiews = rewiews;
    }
  }



  var  item1 =  new adItem(
    new String('1'),
    new String('desc1'),
    new Date('2021-05-20T12:00:00'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new String('ven1'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new Array('hashtag1', 'hashtag2'),
    new String('3%'),
    new Date('2021-01-13T12:00:00'),
    new Number(5),
    new Array('comment-1-1','comment-1-2')
  );
  var  item2 =  new adItem(
    new String('2'),
    new String('desc2'),
    new Date('2021-05-20T12:00:00'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new String('ven1'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new Array('hashtag-2-1', 'hashtag-2-2'),
    new String('12%'),
    new Date('2021-01-13T12:00:00'),
  );
  var  item3 =  new adItem(
    new String('3'),
    new String('desc2'),
    new Date('2021-07-20T12:00:00'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new String('vendor3'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new Array('hashtag-3-1', 'hashtag-3-2'),
    new String('10%'),
    new Date('2021-01-13T12:00:00'),
    new Number(5),
    undefined
  );
  var  item4 =  new adItem(
    new String('4'),
    new String('desc4'),
    new Date('2021-05-28T12:00:00'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new String('vendor4'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new Array('hashtag-4-1', 'hashtag-4-2'),
    new String('30%'),
    new Date('2021-01-13T12:00:00'),
    undefined,
    undefined
  );
  var  item5 =  new adItem(
    new String('5'),
    new String('desc5'),
    new Date('2021-01-20T12:00:00'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new String('vendor5'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new Array('hashtag-5-1', 'hashtag-5-2'),
    new String('82%'),
    new Date('2021-01-13T12:00:00'),
    undefined,
    undefined
  );
  var  item6 =  new adItem(
    new String('6'),
    new String('desc6'),
    new Date('22021-01-14T12:00:00'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new String('vendor4'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new Array('hashtag-6-1', 'hashtag-6-2'),
    new String('99%'),
    new Date('2021-01-13T12:00:00'),
    undefined,
    undefined
  );
  var  item7 =  new adItem(
    new String('7'),
    new String('desc7'),
    new Date('2021-07-13T12:00:00'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new String('vendor7'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new Array('hashtag-7-1', 'hashtag-7-2'),
    new String('5%'),
    new Date('2021-01-13T12:00:00'),
    undefined,
    undefined
  );

  var  item8 =  new adItem(
    new String('8'),
    new String('desc8'),
    new Date('2021-02-03T12:00:00'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new String('ven2'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new Array('hashtag-8-1', 'hashtag-8-2'),
    new String('50%'),
    new Date('2021-01-13T12:00:00'),
    undefined,
    undefined
  );
  var  item9 =  new adItem(
    new String('9'),
    new String('desc9'),
    new Date('2021-06-21T12:00:00'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new String('ven3'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new Array('hashtag-9-1', 'hashtag-9-2'),
    new String('220%'),
    new Date('2021-01-13T12:00:00'),
    undefined,
    undefined
  );
  var  item10 =  new adItem(
    new String('10'),
    new String('desc10'),
    new Date('2021-02-28T12:00:00'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new String('vendor10'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new Array('hashtag-10-1', 'hashtag-10-2'),
    new String('22%'),
    new Date('2021-01-13T12:00:00'),
    undefined,
    undefined
  );


  var test = new adCollection();
  //валидность
  console.log(test.validate(item1));

  //добавление
  console.log(test.add(item1));
  console.log(test.add(item3));


  //получение
  console.log(test.get('1'));
  console.log(test.get('555'));

  //изменение
  console.log(test.get('3'));

  //удаление
  console.log(test.remove('3'));
  console.log(test.get('3'));

  //полная очистка
  test.clear();
  console.log(test.get('1'));
  console.log(test.get('3'));

  //добавить массив
  let temp = new Array(item1, item2, item3);
  console.log(test.addAll(temp));
  console.log(test.get('1'));
  console.log(test.get('2'));
  console.log(test.get('3'));

  //заполним коллекцию
  test.add(item4);
  test.add(item5);
  test.add(item6);
  test.add(item7);
  test.add(item8);
  test.add(item9);
  test.add(item10);

  //фильтр
  console.log(test.getPage());
  console.log(test.getPage(2, 3));
  console.log(test.getPage(0,9, {vendor: 'ven1'}));
  console.log(test.getPage(0, 0, {vendor: 'ven2'}));

}());
