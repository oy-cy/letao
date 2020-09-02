// 封装一个模块，用于定义各种请求的方法


import instance from './config.js';

export async function getLunBoData() {
    return await instance.get('/getlunbo');
}
export async function gettuijian() {
    return await instance.get('/recommend?limit=6');
}
export async function getGoodList(number) {
    return await instance.get(`/getgoods?pageindex=${number}`);
}
export async function goodsDetailImg(id) {
    return await instance.get(`/getthumbimages/${id}`);
}
export async function goodsDetailInfo(id) {
    return await instance.get(`/getgoodsinfo/${id}`);
}
export async function getNewsListData(page = 1, pagesize = 5) {
    return await instance.get(`/getnewslist?page=${page}&pagesize=${pagesize}`);
}

export async function newsDetailInfo(id) {
    return await instance.get(`/getnew/${id}`);
}
export async function newsDetailComments(id, page) {
    return await instance.get(`getcomments/${id}?pageindex=${page}`);

}
export async function addNewsDetailComments(id, content) {

    return await instance.post(`postcomment/${id}`,
        content, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });


}
// 获取图片所有的分类
export async function getPhotoCateData(page) {
    return await instance.get(`/getcategory`);
}


// 获取指定图片分组下的分类数据
export async function getPhotoCateListData(id) {
    return await instance.get(`/getcatelist/${id}`);
}

// 获取指定图片的缩略图
export async function getPhotoThumbData(id) {
    return await instance.get(`/getthumbimages/${id}`);
}
