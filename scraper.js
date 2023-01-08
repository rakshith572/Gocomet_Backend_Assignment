// const { response } = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cheerio=require('cheerio');
const { response } = require('express');

const searchUrl = "https://medium.com/tag/"
const BlogUrl = "https://medium.com/"

const TagCache={};
 const idStore=[]
const searchTag = (tag)=>{
    // console.log(`${searchUrl}${tag}`)
    return fetch(`${searchUrl}${tag}`)
        .then(response=>response.text())
        .then(body=>{
            // console.log(body)
            const $=cheerio.load(body);
            const tags=[];
            $(`article`).each((i,element)=>{
                const $element=$(element);
                const Creator = $element.find(`.bd.b.be.z.ff.jv.fg.fh.fi.fj.dh.fk.bi`).text();
                const title = $element.find(`div.ki.kj.kk.kl.km.l h2`).text();
                // console.log($element.find(`div.kf.kg.kh.ki.kj.l h2`))
                const Details= $element.find(`span.jw`).parent().text();
                var AutherLink=null;
                var BlogLink=null;
                var cnt=0;
                $element.find(`.ae.af.ag.ah.ai.aj.ak.al.am.an.ao.ap.aq.ar.as`).each((i,ele)=>{
                    const $ele=$(ele);
                    cnt++;
                    if(cnt==1){
                        AutherLink=$ele.attr('href')
                    }
                    if(cnt==2){
                        BlogLink=$ele.attr('href')
                        return false;
                    }
                })
                if(BlogLink.startsWith("https://medium.com/")){
                    BlogLink = BlogLink.split("https://medium.com/")[1]
                }
                if(AutherLink.startsWith("https://medium.com/")){
                    AutherLink = AutherLink.split("https://medium.com/")[1]
                }
                if(AutherLink.startsWith('/')){
                    AutherLink = AutherLink.substring(1)
                }
                if(BlogLink.startsWith('/')){
                    BlogLink = BlogLink.substring(1)
                }
                const ImageLink = $element.find(`div.mt.mu.j.i.d img`).attr('src')
                const id=Date.now().toString(36) + Math.random().toString(36).substring(2)
                const AutherImage = $element.find(`div.l.dg img`).attr('src')
                const tag={
                    Title:title,
                    Creator:Creator,
                    Details:Details,
                    AutherLink:AutherLink,
                    BlogLink:BlogLink,
                    ImageLink:ImageLink,
                    id:id,
                    AutherImage:AutherImage
                }
                tags.push(tag)
                idStore.push(id)
                TagCache[id]=tag
            })
            // console.log(tags)
            return tags;
        })
}

const getBlog=(id)=>{
    const Details = TagCache[id];
    const BlogLink = Details.BlogLink;
    return fetch(`${BlogUrl}${BlogLink}`)
    .then(response=>response.text())
    .then(body=>{
        // console.log(body)
        const $=cheerio.load(body);
        const section = $(`section`)
        const AboutBlog={
                Title : Details.Title,
                AutherImage:Details.AutherImage,
                AuthorLink:Details.AutherLink,
                Auther:Details.Auther,
                BlogImgae:Details.ImageLink,
                BlogLink:Details.BlogLink,
                HtmlContent:section.html()
        }
        return AboutBlog;
    })
}
// const getSection=(BlogLink)=>{
//    fetch(`${BlogUrl}${BlogLink}`)
//    .then(response=>response.text())
//    .then(body=>{
//     const $=cheerio.load(body);
//     const section=$(`section`)
//     console.log(section.html())
//    })
// }
// getSection("javascript-in-plain-english/6-free-modern-tools-for-developers-of-2023-b4f4e764ffa4")
// searchTag('python')
module.exports={
    searchTag,
    getBlog
}