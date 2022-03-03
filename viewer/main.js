/*
const incomePerMonth = 99999;
const incomePerSec = incomePerMonth / (20 * 8 * 3600);
const interval = 10; //ms

let h08 = new Date(); h08.setHours(8, 0, 0, 0);  h08 = h08.getTime();
let h12 = new Date(); h12.setHours(12, 0, 0, 0); h12 = h12.getTime();
let h14 = new Date(); h14.setHours(14, 0, 0, 0); h14 = h14.getTime();
let h18 = new Date(); h18.setHours(18, 0, 0, 0); h18 = h18.getTime();

let income = 0;

setInterval(() => {
    let now = new Date().getTime();
    let diff = 0;
    if(now < h08) { diff = 0; }
    if(now >= h08 && now <= h12) { diff = now - h08; }
    else if(now > h12 && now < h14) { diff = h12 - h08; }
    else if(now >= h14 && now <= h18) { diff = (h12 - h08) + (now - h14); }
    else if(now > h18) { diff = (h12 - h08) + (h18 - h14); }
    diff = diff / interval;
    income = (incomePerSec * interval / 1000) * diff;
    $("#income").html(income.toFixed(2));
}, interval);
*/

let MARKDOWN_TAGS = [];

$("markdown").each((i, e) => {
    let tag = $(e).attr("id");
    MARKDOWN_TAGS.push(tag);
    $("#Nav").append(`<div class="NavItem" data-tag="${tag}">${tag}</div>`);
});

$("#LeftTop").html(`
<div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; margin: 0 0 20px 15px;">
<div class="Logo">BD4SUR</div>
<div class="Subtitle">Amateur Radio Station</div>
</div>
`);

function goTop() {
    $("html, body").animate({ scrollTop: 0 }, "fast");
}

function showMarkdown(tag) {
    if(tag === undefined || tag.length <= 0) return;
    if($(`markdown[id="${tag}"]`).length === 0) return;
    let markdown = $(`markdown[id="${tag}"]`).html().replace(/&gt;/gi, ">").replace(/&lt;/gi, "<");
    let mdobj = ParseMarkdown(markdown);
    $(".Article").html(mdobj.html);
    RenderTOC(mdobj.outline);

    goTop();

    $(".NavItem").removeClass("Selected");
    $(`.NavItem[data-tag="${tag}"]`).addClass("Selected");

    $(".StickyTitle").html(tag);
}

$(".NavItem").each((i, e) => {
    $(e).click(() => {
        showMarkdown($(e).attr("data-tag"));
    });
})

$(".StickyTitle").click(() => { goTop(); });

showMarkdown(MARKDOWN_TAGS[0]);
goTop();
