((window) =>{
    const performance = window.performance;
    if(!performance){
        console.log(":( 您当前的浏览器过低，请切换高版本Chrome浏览器")
        return;
    }
    function getPerformanceTiming(){
        let initObj = [
            {
                name:'重定向次数(同源下)',
                'durations(ms)':0,
                tips:'减少重定向次数'
                
            },
            {
                name:'重定向耗时(同源下)',
                'durations(ms)':0,
                tips:'减少重定向次数',
            },
            {
                name:'DNS解析耗时',
                'durations(ms)':0,
                tips:'DNS预加载、减少网站请求资源不同域名的个数',
            },
            {
                name:'TCP建立连接完成握手耗时',
                'durations(ms)':0,
                tips:'',
            },
            {
                name:'HTTP请求响应耗时',
                'durations(ms)':0,
                tips:'keep-alive 长连接、开启本地cache、CDN分发',
            },
            {
                name:'内容下载耗时(注意是否存在本地cache)',
                'durations(ms)':0,
                tips:'资源打包压缩、开启gzip压缩',
            },
            {
                name:'DOM解析耗时',
                'durations(ms)':0,
                tips:'精简DOM层级结构',
            },
            {
                name:'触发DOMContentLoaded事件 时间点',
                'durations(ms)':0,
                tips:'',
            },
            {
                name:'内嵌资源(样式表、图像和子框架)加载耗时',
                'durations(ms)':0,
                tips:'',
            },
            {
                name:'触发Load事件 时间点',
                'durations(ms)':0,
                tips:'',
            },
            {
                name:'onload事件js执行 耗时',
                'durations(ms)':0,
                tips:'优化js执行性能(变量缓存、节流、防抖)',
            },
            
        ]
        const timing = performance.timing
        
       let webTimingObj =  initObj.map((obj, index) => {
            switch(index){
                case 0:
                obj['durations(ms)'] = Math.round(performance.navigation.redirectCount);
                break;
                case 1:
                obj['durations(ms)'] = Math.round(timing.redirectEnd - timing.redirectStart);
                break;
                case 2:
                obj['durations(ms)'] = Math.round(timing.domainLookupEnd - timing.domainLookupStart);
                break;
                case 3:
                obj['durations(ms)'] = Math.round(timing.connectEnd - timing.connectStart);
                break;
                case 4:
                obj['durations(ms)'] = Math.round(timing.responseStart - timing.requestStart);
                break;
                case 5:
                obj['durations(ms)'] = Math.round(timing.responseEnd - timing.responseStart);
                break;
                case 6:
                obj['durations(ms)'] = Math.round(timing.domInteractive - timing.domLoading);
                break;
                case 7:
                obj['durations(ms)'] = Math.round(timing.domContentLoadedEventStart - timing.navigationStart);
                break;
                case 8:
                obj['durations(ms)'] = Math.round(timing.domComplete - timing.domContentLoadedEventEnd);
                break;
                case 9:
                obj['durations(ms)'] = Math.round(timing.loadEventStart - timing.navigationStart);
                break;
                case 10:
                obj['durations(ms)'] = Math.round(timing.loadEventEnd - timing.loadEventStart);
                break;
                
            }
            return obj;
                
        })
        console.group("网页加载时间分析")
        console.table(webTimingObj)
        console.groupEnd()

    }

    function getResourceTiming(){
        let resourceObj = performance.getEntries().map((resource) => {
         return {
             url: resource.name,
             type: resource.initiatorType,
             '加载总时长(ms)': Math.round(resource.duration),
             'DNS解析耗时(ms)': Math.round(resource.domainLookupEnd - resource.domainLookupStart),
             'TCP连接耗时(ms)': Math.round(resource.connectEnd - resource.connectStart),
             'HTTP请求响应耗时(ms)': Math.round(resource.responseStart - resource.requestStart),
             '资源下载耗时(ms)': Math.round(resource.responseEnd - resource.responseStart)
         }
       })
       console.group("资源加载时间分析")
       console.table(resourceObj)
       console.groupEnd()
    }
    chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {
            
            request.action == 'webTiming' ? getPerformanceTiming() : getResourceTiming()
        })
     
})(window)