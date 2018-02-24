import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <style global jsx>{`
        /* 默认a标签样式*/
        a {
          color: #242223;
          /* display: inline-block; */
        }
        /*文本位置*/
        .wx-text-left{
            text-align:left;
        }
        .wx-text-center{
            text-align:center;
        }
        .wx-text-right{
            text-align:right;
        }
        /*文本单行*/
        .wx-text-rowsingle {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        /*图片宽度限制*/
        .wx-img-full img{
            max-width:100%;
        }
        /*快速浮动和清除浮动*/
        .wx-clearfix:before,
        .wx-clearfix:after {
            content: ' ';
            display: table;
        }
        .wx-clearfix:after {
            clear: both;
        }
        .wx-pull-left {
          float: left !important;
        }
        .wx-pull-right {
          float: right !important;
        }
        /*限制行数，多余内容省略号*/
        .wx-line-clamp {
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .wx-line-clamp2 {
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .wx-line-clamp3 {
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .wx-line-clamp4 {
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
        /*文本动换行*/
        .wx-line {
          word-break: break-all;
          word-wrap:break-word;
        }
        .wx-top-fixed {
          position: fixed;
          z-index: 999;
          background: #fff;
          width: 100%;
          top: 0;
        }
        .wx-bottom-fixed {
          position: fixed;
          z-index: 999;
          background: #fff;
          width: 100%;
          bottom: 0;
        }
        /* 左右两侧，上下居中*/
        .wx-space-center {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .wx-space-left {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        /* block */
        .wx-block {
          display: block;
        }
        /* 富文本兼容样式 */
        .rich-text ol,
        .rich-text ul {
          margin-left: 1rem !important;
          max-width: 100% !important;
        }
        .rich-text blockquote {
          margin-left: 0;
          padding-left: 10px;
          border-left: 5px solid #efefef;
        }
        .rich-text img {
          max-width: 100% !important;
          height: auto !important;
        }
      `}</style>
    )
  }
}
