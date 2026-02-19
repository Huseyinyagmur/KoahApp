export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  iconColor: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'KOAH Nedir? Belirtileri ve Tanısı',
    summary: 'Kronik Obstrüktif Akciğer Hastalığı hakkında temel bilgiler, erken belirtiler ve tanı yöntemleri.',
    content: 'Kronik Obstrüktif Akciğer Hastalığı (KOAH), akciğerlerdeki hava yollarının daralması ve hasar görmesiyle karakterize edilen kronik bir solunum hastalığıdır.\n\nKOAH, dünya genelinde en yaygın ölüm nedenlerinden biri olmaya devam etmektedir. Hastalık genellikle yıllar içinde yavaş yavaş ilerler.\n\nErken belirtiler arasında nefes darlığı, kronik öksürük, balgam üretimi ve hırıltılı solunum yer alır. Bu belirtiler başlangıçta hafif olabilir ve sıklıkla göz ardı edilir.\n\nTanı genellikle spirometri testi ile konulur. Bu test, akciğerlerinizin ne kadar hava tutabildiğini ve ne kadar hızlı nefes verebildiğinizi ölçer.\n\nErken tanı, hastalığın ilerlemesini yavaşlatmada kritik öneme sahiptir. Belirtileriniz varsa mutlaka bir göğüs hastalıkları uzmanına başvurun.',
    author: 'Dr. Ayşe Yılmaz',
    date: '15 Ocak 2026',
    readTime: '4 dk',
    category: 'Genel Bilgi',
    iconColor: '#26A69A',
  },
  {
    id: '2',
    title: 'Nefes Egzersizlerinin Önemi',
    summary: 'Düzenli nefes egzersizleri ile KOAH semptomlarını nasıl kontrol altına alabilirsiniz?',
    content: 'Nefes egzersizleri, KOAH hastalarının yaşam kalitesini önemli ölçüde artırabilir. Bu egzersizler, akciğer kapasitesini iyileştirmeye ve nefes darlığını azaltmaya yardımcı olur.\n\nBüzük dudak nefesi, en temel ve etkili egzersizlerden biridir. Bu teknikte burnunuzdan nefes alır, büzülmüş dudaklarınızdan yavaşça verirsiniz.\n\nDiyafram nefesi ise karın kaslarınızı kullanarak daha derin ve etkili nefes almanızı sağlar. Bu teknik, akciğerlerinizin alt kısımlarını da kullanmanıza yardımcı olur.\n\nAraştırmalar, günde 15-20 dakika nefes egzersizi yapan KOAH hastalarının, yapmayanlara göre %25 daha az nefes darlığı yaşadığını göstermektedir.\n\nEgzersizlere yavaş başlayın ve zaman içinde süreyi artırın. Kendinizi zorlamayın ve başınız dönerse hemen durun.',
    author: 'Fzt. Mehmet Kaya',
    date: '22 Ocak 2026',
    readTime: '5 dk',
    category: 'Egzersiz',
    iconColor: '#5C6BC0',
  },
  {
    id: '3',
    title: 'KOAH ve Beslenme İlişkisi',
    summary: 'Doğru beslenme alışkanlıklarının KOAH yönetimindeki rolü ve önerilen besinler.',
    content: 'Beslenme, KOAH yönetiminde sıklıkla göz ardı edilen ancak son derece önemli bir faktördür.\n\nKOAH hastaları, sağlıklı bireylere göre %10-15 daha fazla enerji harcarlar çünkü nefes almak için daha fazla çaba sarf ederler. Bu nedenle yeterli kalori alımı kritik öneme sahiptir.\n\nProtein açısından zengin besinler, solunum kaslarının güçlenmesine yardımcı olur. Yumurta, balık, tavuk ve baklagiller iyi protein kaynaklarıdır.\n\nAntioksidan açısından zengin meyve ve sebzeler, akciğerlerdeki oksidatif stresi azaltır. Özellikle C ve E vitamini içeren besinler faydalıdır.\n\nAz ve sık yemek yeme alışkanlığı, mide şişkinliğini önleyerek nefes almayı kolaylaştırır. Büyük öğünler diyaframı sıkıştırabilir.\n\nBol su içmek, balgamı inceltmeye ve vücuttan atılmasını kolaylaştırmaya yardımcı olur.',
    author: 'Dyt. Zeynep Demir',
    date: '3 Şubat 2026',
    readTime: '6 dk',
    category: 'Beslenme',
    iconColor: '#FF7043',
  },
  {
    id: '4',
    title: 'Kış Aylarında KOAH Yönetimi',
    summary: 'Soğuk havalarda alevlenmeleri önlemek için alabileceğiniz önlemler ve tavsiyeler.',
    content: 'Kış ayları, KOAH hastaları için özellikle zorlu olabilir. Soğuk ve kuru hava, hava yollarını tahriş ederek alevlenmelere neden olabilir.\n\nDışarı çıkarken ağız ve burnunuzu atkı veya maske ile kapatın. Bu, soğuk havanın doğrudan akciğerlerinize ulaşmasını engeller.\n\nGrip ve zatürre aşılarınızı mutlaka yaptırın. Bu enfeksiyonlar KOAH alevlenmelerinin en önemli nedenlerindendir.\n\nEvinizin nemini %40-50 arasında tutun. Çok kuru hava solunum yollarınızı tahriş edebilir. Bir nemlendirici kullanmayı düşünebilirsiniz.\n\nİç ortam hava kalitesine dikkat edin. Sigara dumanı, toz ve kimyasal kokulerdan uzak durun.\n\nEgzersizlerinizi iç mekanda yapmaya devam edin. Fiziksel aktiviteyi kış aylarında da sürdürmek çok önemlidir.',
    author: 'Dr. Ali Özkan',
    date: '10 Şubat 2026',
    readTime: '5 dk',
    category: 'Mevsimsel',
    iconColor: '#42A5F5',
  },
  {
    id: '5',
    title: 'KOAH ile Psikolojik Sağlık',
    summary: 'Kronik hastalıkla yaşarken ruh sağlığınızı nasıl koruyabilirsiniz?',
    content: 'KOAH gibi kronik bir hastalıkla yaşamak, fiziksel zorlukların yanı sıra önemli psikolojik etkiler de yaratabilir.\n\nAraştırmalar, KOAH hastalarının %40\'ına kadarının anksiyete veya depresyon belirtileri gösterdiğini ortaya koymaktadır.\n\nNefes darlığı anksiyeteyi tetikleyebilir, anksiyete de nefes darlığını artırabilir. Bu kısır döngüyü kırmak için gevşeme teknikleri ve kontrollü nefes egzersizleri çok etkilidir.\n\nSosyal izolasyondan kaçının. Sevdiklerinizle vakit geçirmek ve destek gruplarına katılmak, yalnızlık hissini azaltır.\n\nYapabildiğiniz aktivitelere odaklanın, yapamadıklarınıza değil. Küçük hedefler koyun ve başarılarınızı kutlayın.\n\nGerekirse profesyonel psikolojik destek almaktan çekinmeyin. Terapi ve gerekirse ilaç tedavisi yaşam kalitenizi önemli ölçüde artırabilir.',
    author: 'Psik. Selin Arslan',
    date: '14 Şubat 2026',
    readTime: '5 dk',
    category: 'Psikoloji',
    iconColor: '#AB47BC',
  },
];
