(function(){

  var adList = [];

  function adItem(id, description, createdAt, link, vendor, photoLink, hashTags, discount, validUntil, rating, rewiews){
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

  //фильтр сравнивает содержит ли item те же поля что и object, фактически я отбираю посты по всем свойствам переданного объекта
  //единственный случай когда не работает так как хотелось бы - getAds(filtParam), распознает 1 аргумент как skip...
  function filterConfig(object, item){
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

  function getAds(skip = 0, top = 10, object = undefined){
    return adList.filter(item => filterConfig(object, item)).slice(skip, (skip + top)).sort( (a, b) => a.createdAt - b.createdAt);
  }

  function getAd(id){
    for(let item of adList){
      if(item.id == id){
        return item;
      }
    }
    return null;
  }

  function validateAd(object){
    for(let property in object){
      switch(property){
        case 'id':
          if(object[property] == undefined || object[property] == '' || (object[property] instanceof String == false) ){
            return false;
          }
          for(let token of adList){
            if(token.id == object[property]){
              return false;
            }
          }
          break;

        case 'description':
          if(object[property] == undefined || object[property] >= 200 || object[property] == '' || (object[property] instanceof String == false) ){
            return false;
          }
          break;

        case 'createdAt':
          if(object[property] == undefined || object[property] == '' || isNaN(object[property]) == true || (object[property] instanceof String == true) ){
            return false;
          }
          break;

        case 'validUntil':
          if(object[property] == undefined || object[property] == '' || isNaN(object[property]) == true || (object[property] instanceof String == true) ){
            return false;
          }
          break;
        //валидность на существование сайта/регулярное выраж ?
        case 'link':
          if(object[property] == undefined || object[property] == '' || (object[property] instanceof String == false) ){
            return false;
          }
          break;

        case 'vendor':
          if(object[property] == undefined || object[property] == '' || (object[property] instanceof String == false)){
            return false;
          }
          break;

        case 'photoLink':
          if(object[property] != undefined && (object[property] instanceof String == false) ){
            return false;
          }
          break;

        case 'hashTags':
          if(object[property] == undefined || Array.isArray(object[property]) == false || object[property].length == 0){
            return false;
          }
          for(let token of object[property]){
            if(token == ''){
              return false;
            }
          }
          break;

        case 'discount':
          if(object[property] == undefined || object[property] == '' || (object[property] instanceof String == false) ){
            return false;
          }
          break;

        case 'rating':
          if(object[property] != undefined && (object[property] instanceof Number == false) ){
            return false;
          }
          break;

        case 'reviews':
          if( object[property] != undefined && Array.isArray(object[property]) == false){
            return false;
          }
          break;
      }
    }
    return true;
  }

  function addAd(object){
    if(validateAd(object) == true){
      adList.push(object);
      return true;
    }else{
      return false;
    }
  }

  function editAd(id, object){
    let item;
    let index;
    for(let i = 0; i < adList.length; i++){
      if(adList[i].id == id){
        item = adList[i];
        index = i;
        break;
      }
    }
    let copy_item = item;
    for(let property in object){
      if(property != 'id' && property != 'vendor' && property != 'createdAt' && object[property] != undefined){
        item[property] = object[property];
      }
    }
    adList.splice(index, 1);
    if(validateAd(item)){
      adList.splice(index, 0, item);
      return true;
    }else{
      adList.splice(index, 0, copy_item);
      return false;
    }
  }

  function removeAd(id){
    if(getAd(id) !== null){
      for(let i = 0; i < adList.length; i++){
        if(adList[i].id == id){
          adList.splice(i, 1);
          return true;
        }
      }
    }else{
      return false;
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

  adList.push(item1,item2,item3,item4,item5,item6,item7,item8,item9, item10);


  var  item11 =  new adItem(
    undefined,
    new String('desc11'),
    undefined,
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    undefined,
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new Array('hashtag-11-1', 'hashtag-11-2'),
    new String('12%'),
    new Date('2021-03-15T12:00:00'),
    undefined,
    undefined
  );

  var  item12 =  new adItem(
    new String('12'),
    new String('desc12'),
    new Date('2021-03-17T12:00:00'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new String('vendor22'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new Array(),
    new String('666%'),
    new Date('2021-03-15T12:00:00'),
    undefined,
    undefined
  );
  var  item13 =  new adItem(
    new String('13'),
    new String('desc13'),
    new Date('2021-03-17T12:00:00'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new String('vendor23'),
    new String('https://www.ozon.ru/category/knigi-16500/?from_global=true&text=interesting+thing'),
    new Array('hashtag-23-1', 'hashtag-23-2'),
    new String('69%'),
    new Date('2021-03-15T12:00:00'),
    undefined,
    undefined
  );
  var  item14 =  new adItem(
    new String('14'),
    new String('desc14'),
    new Date('2021-03-17T12:00:00'),
    new String(''),
    new String('vendor99'),
    new String(''),
    undefined,
    new String('10%'),
    new Date('2021-03-15T12:00:00'),
    undefined,
    undefined
  );

  // получение объявления
  console.log(getAd('5'));
  console.log(getAd('21')) ;
  console.log(getAd(''));
  // валидность поста
  console.log(validateAd(item11));
  console.log(validateAd(item12));
  console.log(validateAd(item13));
  // редактирование поста ---
  console.log(editAd('5', item11))
  console.log(editAd('6', item14));
  // добавление поста
  console.log(addAd(item13));
  console.log(addAd(item11));
  // удаление поста
  console.log(removeAd('1'));
  console.log(getAd('1'));
  console.log(removeAd('50'));
  // сортировка с фильтром
  getAds(0, 10, {id: '8'})
  console.log(getAds(0, 9,{vendor : 'ven1'}));
  console.log(getAds(2, 4, {vendor : 'ven2'}));
  console.log(getAds(0, 0,{vendor : 'ven3'}));
  console.log(getAds(0, 2));
}());
