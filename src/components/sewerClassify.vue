<template>
    <div class='ResearchTitle'>
        基于图神经网络的多任务管道图像分类方法研究与应用
    </div>

    <li class="list">研究内容介绍</li>

    <div class='ResearchContent'>
        <p>随着现代化社会的快速发展，城市化建设的步伐不断加快，与此同时，排水管道的分布也越来越密集。排水管道与城市的公共卫生、安全以及经济利益等有着密切的关系，
            如果排水管道发生堵塞或者破裂等缺陷，将对人们的社会生活造成严重影响。因此，对排水管道进行定期缺陷检查至关重要。
            以往，这类检查主要依赖人工方式进行，辅以闭路电视（Closed Circuit Television, CCTV）监控、传感器等设备。
            然而，由于排水管道所处环境复杂，传统的人工检查方式不仅费时费力，且极易造成缺陷漏检。
            因此，开发自动化管道缺陷检查方法对提高管道检查效率和准确性至关重要。
            现有的管道缺陷检查方法，大多只针对管道缺陷进行分类，而且大部分只对单一缺陷进行分类，已有的多标签缺陷分类方法模型设计较为简单，分类准确率不高，
            同时缺少对管道健康状态（水位等）的分类方法研究。</p>
        <p>针对以上问题，本文提出了基于图神经网络的多任务管道图像分类方法，主要研究内容包括：</p>
        <p>（1）本文提出了基于对比学习的多任务管道图像分类网络（Multi-Task Sewer Image Classification Network Based on Contrastive Learning，MSCCL）。
            工业异常检测时，往往难以获取异常样本，管道图像分类作为工业异常检测的子任务，同样存在这个问题。
            样本分布不均衡导致模型参数偏向正样本类别，为减轻正常样本在网络中所占权重，本文首先采用基于ResNet34的预分类模块对管道图像进行预分类，识别管道图像中的正样本与缺陷样本。
            然后，本文采用基于对比学习的多任务分类模块对管道图像进行多任务分类，包含缺陷分类和水位分类。由于缺陷分类为多标签分类，水位分类为单标签分类，
            本文分别采用多标签和单标签方式构建对比学习。进行多标签对比学习时，将标签嵌入和特征嵌入在潜空间进行对比，以标签嵌入作为锚样本，判断特征嵌入与不同标签嵌入的相似性。
            进行单标签对比学习时，将原图像生成增强图像，原图像与增强图像同时输入网络，对每个批次的训练图像，只有一张图像与原图像相同，其他样本均为负样本，以此提高不同图像之间的对比度。
            通过对比学习，提高了每个类别的类内特征聚合效果，以此提高了每个任务的分类准确率。
            在公共数据集Sewer-ML上的实验结果表明，MSCCL在缺陷分类任务的F2CIW指标达到58%左右，F1Normal指标达到了92.28%左右。在水位分类任务上，MSCCL也有较高的准确率。</p>
        <p>（2）本文提出了融合多尺度特征提取的多任务管道图像分类网络（Fusion Multi-Scale Multi-Task Sewer Image Classification Network，FMMSC）。
            在进行多标签图像分类时，传统的CNN网络无法同时关注图像中的局部和全局特征，这将导致某些图像中缺陷的特征无法被充分提取，而且，在分类时，
            标签通常只在最后分类阶段起到正则作用，用以优化模型，标签与特征之间的关系无法得到充分利用。FMMSC仍然采用MSCCL中的预分类模块对管道图像进行预分类，
            将MSCCL中基于对比学习的多任务分类模块改进为基于多尺度特征的多任务分类模块。基于多尺度特征的多任务分类模块首先采用Res2Net特征提取网络进行多尺度特征提取，
            Res2Net通过将输入划分为不同的分支，再将不同分支的特征进行聚合，以此加强了网络的特征提取能力。然后通过跨尺度特征融合模块将图神经网络扩展为四层，
            图神经网络在向前传播特征时，通过特征适配器汇聚Res2Net从浅层到深层的特征。最后进行缺陷任务和水位任务的分类输出。在公共数据集Sewer-ML上的实验结果表明，
            FMMSC在缺陷分类任务上，F2CIW指标高于目前所有的方法，F1Normal指标相较于MSCCL提升了0.2%左右。</p>
    </div>

    <li class="list">分类结果展示</li>

    <div class='sewerImageClassifyResult' >
        <div class="image" v-for="(resultShow, index) in resultShow" :key="index">
            <img :src=resultShow.img alt="gallery image">
            <table class="image-table">
                <tbody>
                    <tr>
                        <td>{{ resultShow.imgPath }}</td>
                        <td>{{ resultShow.predictResult }}</td>
                        <td>{{ resultShow.trueLabel }}</td>
                    </tr>
                    <tr>
                        <td>{{ resultShow.ND }}</td>
                        <td>{{ resultShow.predictNDLabel }}</td>
                        <td>{{ resultShow.trueNDLabel }}</td>
                    </tr>
                    <tr>
                        <td>{{ resultShow.Defect }}</td>
                        <td>{{ resultShow.predictDefectLabel }}</td>
                        <td>{{ resultShow.trueDefectLabel }}</td>
                    </tr>
                    <tr>
                        <td>{{ resultShow.water }}</td>
                        <td>{{ resultShow.predictWaterLabel }}</td>
                        <td>{{ resultShow.trueWaterLabel }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            images: [],
            imagePaths:[],
            resultShow: [],
            resultFile: [],
        };
    },
    mounted() {
        this.loadImages();
        this.init();
        this.handleFileSelect();
        this.resultPadding();
    },
    methods: {

        loadImages() {
            const context = require.context('@/sewer/imgs', false, /\.*\.png/);
            context.keys().forEach((key) => {
                this.images.push(context(key));
                this.imagePaths.push(key.split('/')[1]);
            });
        },

        handleFileSelect() {
            let xhr = new XMLHttpRequest();
            const okStatus =document.location.protocol === 'file:' ? 0: 200;
            xhr.open('GET', 'classifyResult.txt', false);
            xhr.overrideMimeType('text/html;charset=utf-8');
            xhr.send(null);
            const lines = xhr.responseText.split('\n').map(line => line.split(',').map(item => item.trim()));
            this.resultFile = lines;
            console.log(this.resultFile);
            return xhr.status === okStatus? xhr.responseText: null;
        },

        init() {
            const resultShow = [];
            for (var i = 0; i< this.imagePaths.length; i++) {
                resultShow.push({
                    'img': this.images[i],
                    'imgPath': this.imagePaths[i],
                    'predictResult': '预测结果',
                    'trueLabel': '真实标签',
                    'ND': 'ND',
                    'Defect': 'Defect',
                    'water': 'WaterLevel',
                    'predictNDLabel': '',
                    'predictDefectLabel': '',
                    'predictWaterLabel': '',
                    'trueNDLabel': '',
                    'trueDefectLabel': '',
                    'trueWaterLabel': '',
                });  
            }
            this.resultShow =resultShow;
        },

        resultPadding() {
            for (var i=0; i< this.imagePaths.length; i++){
                if (this.resultFile[i+1][1] == 1) {
                    this.resultShow[i]['predictNDLabel'] = this.resultFile[i+1][1];
                } else {
                    this.resultShow[i]['predictNDLabel'] = 0;
                    var temp = this.resultFile[i+1][1].replace(/;/g, ',');
                    temp = temp.replace(/、/g, ',');
                    temp = eval("("+temp+")");
                    this.resultShow[i]['predictDefectLabel'] = temp['Defects'];
                    this.resultShow[i]['predictWaterLabel'] = temp['Water'];
                }
                if (this.resultFile[i+1][2] == 1) {
                    this.resultShow[i]['trueNDLabel'] = 1;
                } else {
                    this.resultShow[i]['trueNDLabel'] = 0;
                    var tmp = this.resultFile[i+1][2].replace(/;/g, ',');
                    tmp = tmp.replace(/、/g, ',');
                    tmp = eval("("+tmp+")");
                    this.resultShow[i]['trueDefectLabel'] = tmp['Defects'];
                    this.resultShow[i]['trueWaterLabel'] = tmp['Water'];
                }     
            }
        }
    },
};
</script>

<style scoped>

.ResearchTitle{
     width: 2000px;
     height: 40px;
     font-size: 24px;     
     text-align: center;
}

.list{
    width: 200px;
    height: 50px;
    font-size: 20px;
}

.sewerImageClassifyResult{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
}

.image img{
    width: 280px;
    height: 224px;
}

/* .image-table{
    position: absolute;
    bottom: 0;
    left: 0;
} */
.image-table td{
    font-size: 16px;
    padding: 10px;
}

</style>
