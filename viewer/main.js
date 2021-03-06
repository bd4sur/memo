let MARKDOWN_TAGS = [];

$("markdown").each((i, e) => {
    let tag = $(e).attr("id");
    MARKDOWN_TAGS.push(tag);
});

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

    $("#PageTitle").html(tag);
}

$("#PageTitle").click(() => { goTop(); });

$("#TocToggle").click(() => { $(".TableOfContents").slideToggle(100); });

showMarkdown(MARKDOWN_TAGS[0]);
goTop();

let headerContent = `
<div style="text-align: center; font-size: 18px; font-weight: lighter; line-height: 2;">Amateur Radio Station</div>
<div style="text-align: center; font-size: 24px; font-weight: bold;">BD4SUR</div>
`;
$("#Header").html(headerContent);
