// «On this day in Hijri history» — English & Urdu content for the OTD feature.
// The Arabic content is the single source of truth in ./onthisday.ts; this file
// adds parallel EN/UR translations keyed by the shared event slug, plus small
// language-aware helpers used by the homepages and the /on-this-day/ pages.
import { OTD_EVENTS, type OtdEvent } from './onthisday';
import { H_MON_AR, H_MON_EN, H_MON_UR, type Lang, type LangLike, toLang } from './data';

export interface OtdContent {
  year: string;
  title: string;
  summary: string;
  story: string[];
  source: string;
  disputed?: string;
}

export const OTD_EN: Record<string, OtdContent> = {
  // ————————————————— Muharram —————————————————
  'hijri-calendar-adopted': {
    year: `17 AH`,
    title: `Adoption of the Hijri calendar`,
    summary: `During the caliphate of ʿUmar ibn al-Khattab (may Allah be pleased with him), the Companions gathered to agree on a unified dating system for the Islamic state. They settled on making the Prophet's ﷺ migration (the Hijra) the epoch of the calendar, and made Muharram the first month of the year.`,
    story: [
      `As the Islamic state expanded under ʿUmar ibn al-Khattab (may Allah be pleased with him) and correspondence between the provinces multiplied, letters reached him bearing no date. So he assembled the senior Companions to consult them on establishing an era by which deeds and covenants could be fixed.`,
      `Suggestions varied: some proposed dating from the Prophet's ﷺ birth, others from the start of his mission. ʿAli ibn Abi Talib (may Allah be pleased with him) proposed dating from the Hijra, for it had separated truth from falsehood and established the Muslims' state — so ʿUmar adopted his view.`,
      `They agreed that Muharram would open the year, as it is when people return from their Hajj. From that time the Hijri calendar became the calendar of the Ummah, by which it fixes its acts of worship and its occasions to this day.`,
    ],
    source: `al-Tabari, Tarikh al-Rusul wa'l-Muluk · Ibn Kathir, al-Bidaya wa'l-Nihaya`,
    disputed: `It is well known that this was in 17 AH, though 16 AH is also reported. It is placed here at the start of Muharram, since that is the first month of the year adopted as the epoch.`,
  },
  'bayah-uthman': {
    year: `24 AH`,
    title: `The pledge of allegiance to ʿUthman ibn ʿAffan as caliph`,
    summary: `After ʿUmar ibn al-Khattab (may Allah be pleased with him) died of his stab wound, the six-man council he had named met, and their decision ended in the pledge of allegiance to ʿUthman ibn ʿAffan (may Allah be pleased with him), the third of the Rightly-Guided Caliphs.`,
    story: [
      `ʿUmar ibn al-Khattab (may Allah be pleased with him) left the succession to a council of six senior Companions with whom the Messenger of Allah ﷺ was pleased when he died: ʿUthman, ʿAli, Talha, al-Zubayr, Saʿd ibn Abi Waqqas and ʿAbd al-Rahman ibn ʿAwf.`,
      `ʿAbd al-Rahman ibn ʿAwf withdrew his own claim in order to conduct the selection, and spent three days and nights consulting the people of Madinah, until he said: I found the people preferring none over ʿUthman.`,
      `On the first of Muharram, 24 AH, ʿAbd al-Rahman pledged allegiance to ʿUthman ibn ʿAffan, and the people followed. His caliphate saw the great expansion of conquests and the gathering of the people upon a single written text of the Qur'an.`,
    ],
    source: `al-Tabari, Tarikh al-Rusul wa'l-Muluk · Ibn al-Athir, al-Kamil fi'l-Tarikh`,
    disputed: `ʿUthman was given the pledge three nights after ʿUmar's burial, on the first of Muharram 24 AH according to the well-known view; some place it in late Dhu'l-Hijja 23 AH.`,
  },
  'khaybar': {
    year: `7 AH`,
    title: `The Battle of Khaybar`,
    summary: `The Prophet ﷺ marched with his Companions to the fortresses of Khaybar north of Madinah after the Treaty of Hudaybiyya. Allah granted its conquest at the hands of ʿAli ibn Abi Talib (may Allah be pleased with him) after a hard siege, and with it the Muslims secured their northern flank.`,
    story: [
      `After the Muslims were secured from Quraysh by the Treaty of Hudaybiyya, the Prophet ﷺ set out with around 1,400 of his Companions who had witnessed Hudaybiyya toward Khaybar, the greatest and most heavily fortified stronghold of the Jews in the Hijaz.`,
      `The Muslims besieged the fortresses and the fighting dragged on, so he ﷺ said: "Tomorrow I shall give the banner to a man who loves Allah and His Messenger and whom Allah and His Messenger love; Allah will grant victory at his hands." He handed it to ʿAli ibn Abi Talib (may Allah be pleased with him), and Allah opened at his hands al-Qamus, the most impregnable of its forts.`,
      `The Prophet ﷺ made peace with its people on the condition that they work its land for half its produce. The conquest of Khaybar secured the north of Madinah and prepared the way for the conquests that followed.`,
    ],
    source: `Ibn Hisham, al-Sira al-Nabawiyya · Sahih al-Bukhari (the hadith of the banner)`,
    disputed: `The Prophet ﷺ set out to Khaybar in late Muharram 7 AH according to Ibn Ishaq; some say in Jumada al-Ula. The sources do not fix the day of departure precisely.`,
  },
  'karbala': {
    year: `61 AH`,
    title: `The martyrdom of al-Husayn ibn ʿAli (may Allah be pleased with them both) at Karbala`,
    summary: `On the day of ʿAshura in 61 AH, the grandson and beloved of the Messenger of Allah ﷺ, al-Husayn ibn ʿAli (may Allah be pleased with them both), was martyred along with a number of his household and companions in the land of Karbala in Iraq — one of the greatest tragedies of Islamic history.`,
    story: [
      `al-Husayn (may Allah be pleased with him) left Makkah heading for Kufa after its people had written to him repeatedly inviting him. When he neared it, the people betrayed and abandoned him; he was surrounded at Karbala and, together with his family, cut off from water.`,
      `On Friday the tenth of Muharram the unequal battle took place. al-Husayn fought like a hero until he was martyred (may Allah be pleased with him), together with around seventy of his household and companions, among them his brothers and his sons.`,
      `His killing shook the whole Ummah, and the scholars counted it among the greatest of calamities. Ibn Kathir said: "None was killed like him among the number and virtue of the household who were killed with him." Its memory endures as a lesson in the duty to guard the sanctity of the Prophet's ﷺ household.`,
    ],
    source: `al-Tabari, Tarikh al-Rusul wa'l-Muluk · Ibn Kathir, al-Bidaya wa'l-Nihaya`,
  },
  'baybars-death': {
    year: `676 AH`,
    title: `The death of Sultan al-Zahir Baybars`,
    summary: `al-Zahir Rukn al-Din Baybars al-Bunduqdari — hero of ʿAyn Jalut, subduer of the Crusaders and the Mongols, and one of the greatest Mamluk sultans, who restored the standing of the Abbasid caliphate in Cairo — died in Damascus.`,
    story: [
      `Baybars was a Turkic Mamluk sold in the slave markets as a boy, then rose by his courage and cunning until he became a commander of armies. He took part in defeating the Seventh Crusade and in the capture of Louis IX at al-Mansura.`,
      `He was among the heroes of the Battle of ʿAyn Jalut that broke the Mongols in 658 AH; then the sultanate came to him. He spent seventeen years in continuous jihad, wresting from the Crusaders their great strongholds such as Antioch, Arsuf and Safad.`,
      `Baybars revived the Abbasid caliphate in Cairo after the fall of Baghdad, and organized the postal service, the army and the judiciary, until he died in Damascus on 28 Muharram 676 AH, buried where the Zahiriyya Library stands today.`,
    ],
    source: `al-Maqrizi, al-Suluk li-Maʿrifat Duwal al-Muluk · Ibn Taghribirdi, al-Nujum al-Zahira`,
    disputed: `His death is famously placed on 28 Muharram 676 AH; some say the 27th of it.`,
  },
  'grand-mosque-seizure': {
    year: `1400 AH`,
    title: `The seizure of the Grand Mosque of Makkah`,
    summary: `At dawn on the first day of the fifteenth Hijri century, an armed group led by Juhayman al-ʿUtaybi stormed the Grand Mosque and held the worshippers hostage, in an incident that lasted about two weeks and shook the entire Muslim world.`,
    story: [
      `At dawn on 1 Muharram 1400 AH (20 November 1979), as the worshippers were preparing for the Fajr prayer, an armed group shut the gates of the Grand Mosque and proclaimed their claims about the appearance of the awaited "Mahdi" — Muhammad ibn ʿAbdullah al-Qahtani, brother-in-law of their leader Juhayman al-ʿUtaybi.`,
      `The scholars denounced the act and ruled that it was permissible to fight those who had entrenched themselves in the Sanctuary, based on Allah's words: "And do not fight them at the Sacred Mosque until they fight you there; but if they fight you, then kill them." Fierce clashes followed, ending with the recovery of the Sanctuary after about two weeks.`,
      `The incident left hundreds dead and wounded. Juhayman and his surviving followers were captured and then executed, and it remained a grave lesson to the Ummah on the danger of extremism and false claims to Mahdism.`,
    ],
    source: `Documents and sources of contemporary history (documented coverage of the incident of 20 November 1979)`,
  },

  // ————————————————— Safar —————————————————
  'ghazwat-alabwa': {
    year: `2 AH`,
    title: `The Expedition of al-Abwaʾ (Waddan) — the first expedition of the Prophet ﷺ`,
    summary: `The Prophet ﷺ set out in person on the first of his expeditions, to al-Abwaʾ, to intercept a Quraysh caravan. He met no fighting and concluded a pact with Banu Damra there — the opening of Prophetic military activity after the Hijra.`,
    story: [
      `After Allah permitted the Muslims to fight — "Permission is given to those who are fought because they were wronged" — the Prophet ﷺ began sending out small parties, then went out himself in Safar at the head of the second year of the Hijra to al-Abwaʾ, between Makkah and Madinah.`,
      `He left Saʿd ibn ʿUbada (may Allah be pleased with him) in charge of Madinah and went out with the Emigrants in particular to intercept a Quraysh caravan. He met no aggression, and along the way concluded a pact of non-aggression with Banu Damra, that they would not mass against him nor aid an enemy against him.`,
      `Though it saw no fighting, al-Abwaʾ announced the Muslims' shift from defence to initiative, and served as practical training in protecting their nascent state and its trade routes.`,
    ],
    source: `Ibn Hisham, al-Sira al-Nabawiyya · Ibn Saʿd, al-Tabaqat al-Kubra`,
    disputed: `It took place in Safar 2 AH by the agreement of the biographers; the sources do not fix its exact day.`,
  },
  'baghdad-fall': {
    year: `656 AH`,
    title: `The fall of Baghdad to the Mongols`,
    summary: `Hulagu's Mongol army entered Baghdad, seat of the Abbasid caliphate, after a strangling siege. They pillaged it for forty days and killed hundreds of thousands, and the caliph al-Mustaʿsim was slain — closing the page on a caliphate that had lasted five centuries.`,
    story: [
      `Hulagu, grandson of Genghis Khan, advanced with vast armies toward Baghdad in late 655 AH and laid siege to it. The caliph al-Mustaʿsim bi'llah was unable to repel him after the army had been neglected, unity had fractured, and the inner circle had betrayed him.`,
      `On the fourth of Safar 656 AH (February 1258) the Mongols entered the city, and there occurred killing and plunder that make the body shudder; the dead were estimated in the hundreds of thousands, and the books of Baghdad's libraries were cast into the Tigris until, it was said, its water ran black with ink.`,
      `The caliph al-Mustaʿsim was killed days later, and the Abbasid caliphate in Baghdad fell after five centuries. Historians counted this catastrophe among the greatest calamities of Islam — until the Muslims returned the blow at ʿAyn Jalut two years later.`,
    ],
    source: `Ibn Kathir, al-Bidaya wa'l-Nihaya · al-Dhahabi, Tarikh al-Islam`,
  },
  'ibn-rushd-death': {
    year: `595 AH`,
    title: `The death of the philosopher Ibn Rushd (Averroes)`,
    summary: `Abu'l-Walid Muhammad ibn Rushd of Cordoba — its judge, physician and philosopher, commentator on Aristotle whose works shaped European thought for centuries, and author of "Bidayat al-Mujtahid" in comparative jurisprudence — died in Marrakesh.`,
    story: [
      `Ibn Rushd was born in Cordoba in 520 AH into a house of judgeship and learning. He combined jurisprudence, medicine, philosophy and astronomy, held the judgeship of Seville then the grand judgeship of Cordoba, and was the private physician of the Almohad caliph.`,
      `The caliph Abu Yaʿqub Yusuf commissioned him to comment on the works of Aristotle, and he produced his famous commentaries, later translated into Latin and Hebrew. In Europe he became known as "the Great Commentator" and profoundly influenced the philosophers of the Middle Ages.`,
      `Late in his life he was put on trial and exiled to Lucena, then pardoned. He died in Marrakesh on 9 Safar 595 AH, and his body was later moved to Cordoba. Among his surviving works are "Bidayat al-Mujtahid wa Nihayat al-Muqtasid," "Tahafut al-Tahafut," and "al-Kulliyyat fi'l-Tibb."`,
    ],
    source: `Ibn Abi Usaybiʿa, ʿUyun al-Anbaʾ · al-Dhahabi, Siyar Aʿlam al-Nubalaʾ`,
  },
  'siffin': {
    year: `37 AH`,
    title: `The Battle of Siffin and the raising of the Qur'ans`,
    summary: `Fighting reached its peak between the army of the caliph ʿAli ibn Abi Talib and that of Muʿawiya ibn Abi Sufyan (may Allah be pleased with them) at Siffin on the Euphrates, until copies of the Qur'an were raised calling for arbitration. The fighting halted, and the strife of the arbitration began.`,
    story: [
      `After the Battle of the Camel the strife moved to Syria, where the army of the Commander of the Faithful ʿAli (may Allah be pleased with him) met the army of the people of Syria under Muʿawiya (may Allah be pleased with him) at Siffin near al-Raqqa. The fighting stretched over days and nights, fiercest of them "the Night of Clamour," in which the weapons never rested.`,
      `When ʿAmr ibn al-ʿAs saw the tide turning, he advised raising the copies of the Qur'an on spear-points and calling for judgement by the Book of Allah to stem the bloodshed. The army of Iraq wavered between accepting and refusing, and ʿAli was compelled to accept the arbitration.`,
      `A faction of ʿAli's army rejected the arbitration — the Khawarij, whom he later fought at al-Nahrawan. Siffin — in which the noble Companion ʿAmmar ibn Yasir was killed — remained one of the greatest episodes of the Great Strife, over which Ahl al-Sunnah withhold their tongues concerning what passed between the Companions.`,
    ],
    source: `al-Tabari, Tarikh al-Rusul wa'l-Muluk · Ibn al-Athir, al-Kamil fi'l-Tarikh`,
    disputed: `The events of Siffin lasted from Dhu'l-Hijja 36 AH into Safar 37 AH; reports differ on fixing the days of the major fighting and the raising of the Qur'ans, the most famous being the first ten days of Safar.`,
  },
  'nasai-death': {
    year: `303 AH`,
    title: `The death of Imam al-Nasaʾi, author of "al-Sunan"`,
    summary: `Imam Abu ʿAbd al-Rahman Ahmad ibn Shuʿayb al-Nasaʾi, author of "al-Sunan al-Sughra" — one of the Six Books — died. He was among the most exacting of hadith scholars in the criticism of narrators, so that it was said: he is a more precise memorizer than Muslim.`,
    story: [
      `al-Nasaʾi was born in Nasa in Khurasan in 215 AH and travelled in pursuit of hadith to the Hijaz, Iraq, Syria and Egypt, where he settled. He compiled "al-Sunan al-Kubra," then selected from it "al-Mujtaba" (al-Sunan al-Sughra), which the scholars ranked among the most rigorous of the Sunnah books in its conditions after the two Sahihs.`,
      `Alongside his mastery of hadith he was a pious, scrupulous jurist. al-Daraqutni said of him: "Abu ʿAbd al-Rahman is placed ahead of everyone mentioned in this science among the people of his age."`,
      `Late in life he left Egypt for Damascus, where he was asked about the virtues of Muʿawiya and declined; he was harmed until he was driven out, and died in Palestine — some say in Makkah — in Safar 303 AH, may Allah have mercy on him.`,
    ],
    source: `al-Dhahabi, Siyar Aʿlam al-Nubalaʾ · Ibn Khallikan, Wafayat al-Aʿyan`,
    disputed: `There is difference over the place of his death, between al-Ramla in Palestine and Makkah, and over its day; the well-known view is 13 Safar 303 AH.`,
  },
  'bir-maouna': {
    year: `4 AH`,
    title: `The tragedy of Biʾr Maʿuna`,
    summary: `ʿAmir ibn al-Tufayl and those with him treacherously killed seventy of the Companion Qur'an-reciters whom the Prophet ﷺ had sent to teach the people of Najd the Qur'an. All were slain but one, and the Prophet ﷺ grieved deeply and made qunut for a month against their killers.`,
    story: [
      `Abu Baraʾ ʿAmir ibn Malik came to the Prophet ﷺ and asked that he send men to call the people of Najd to Islam, guaranteeing them his protection. So he ﷺ sent seventy of the best of his Companions — reciters who would gather firewood by day and study the Qur'an by night.`,
      `When they camped at Biʾr Maʿuna, ʿAmir ibn al-Tufayl incited against them tribes of Sulaym — ʿUsayya, Riʿl and Dhakwan — who surrounded the reciters and killed them to the last, save Kaʿb ibn Zayd, wounded and left among the slain, and ʿAmr ibn Umayya, who was released.`,
      `When the news reached the Prophet ﷺ he grieved over them a grief he had never felt over any expedition, and made qunut for a full month in the Fajr prayer against Riʿl, Dhakwan and ʿUsayya who disobeyed Allah and His Messenger, as is affirmed in the two Sahihs.`,
    ],
    source: `Sahih al-Bukhari · Ibn Hisham, al-Sira al-Nabawiyya`,
    disputed: `It took place in Safar 4 AH by the agreement of the biographers, without a definitive fixing of its day.`,
  },
  'suleiman-death': {
    year: `974 AH`,
    title: `The death of Sultan Suleiman the Magnificent (al-Qanuni)`,
    summary: `The Ottoman Sultan Suleiman the Lawgiver (al-Qanuni) died in his tent during the siege of the fortress of Szigetvár in Hungary, after forty-six years of rule in which the Ottoman state reached the summit of its expansion and power.`,
    story: [
      `Suleiman I assumed the sultanate in 926 AH as a young man. He personally led thirteen major campaigns, conquered Belgrade, Rhodes and most of Hungary after the famous victory of Mohács, besieged Vienna, and his rule stretched from Algiers to Iraq and from the Hijaz to the Balkans.`,
      `Westerners called him "Suleiman the Magnificent," while the Muslims knew him as "al-Qanuni" for organizing the government departments and administrative laws in accordance with the Shariʿa. In his era the architect Sinan built masterpieces, and the walls of Jerusalem standing to this day were renewed.`,
      `On the night of 21 Safar 974 AH (September 1566) he died in his tent during the siege of Szigetvár, nearing seventy. The Grand Vizier concealed the news of his death until the fortress fell, and he was buried in his own mosque, the Süleymaniye, in Istanbul.`,
    ],
    source: `Sources of Ottoman history (Ibn Iyas and the chroniclers of the Ottoman state)`,
  },
  'saladin-death': {
    year: `589 AH`,
    title: `The death of Sultan Salah al-Din al-Ayyubi (Saladin)`,
    summary: `al-Nasir Salah al-Din Yusuf ibn Ayyub — liberator of Jerusalem and hero of Hattin — died in Damascus, leaving of wealth only a single dinar and forty dirhams. The people wept for him a weeping the like of which had not been seen for any king before him.`,
    story: [
      `Salah al-Din spent his life in jihad against the Crusaders and in uniting Egypt and Syria under a single banner, crowned by the victory of Hattin and the recovery of Jerusalem in 583 AH after ninety-one years of occupation.`,
      `After the Peace of Ramla that ended the Third Crusade, he returned to Damascus exhausted and fell ill with a severe fever that spared him only days. The shaykh Abu Jaʿfar was reciting the Qur'an beside him, and when he reached "He is Allah, besides whom there is no god," the historians say his face lit up and he surrendered his soul.`,
      `He died at dawn on Wednesday 27 Safar 589 AH (March 1193) at fifty-seven, leaving in his treasury only a dinar and forty dirhams, for he spent all he owned on jihad and charity. He was buried beside the Umayyad Mosque in Damascus, and his tomb is visited to this day.`,
    ],
    source: `Ibn Shaddad, al-Nawadir al-Sultaniyya · Ibn Khallikan, Wafayat al-Aʿyan`,
  },
  // ————————————————— Rabiʿ al-Awwal —————————————————
  'hijra-start': {
    year: `1 AH`,
    title: `The start of the Hijra: departure to the Cave of Thawr`,
    summary: `The Prophet ﷺ and his companion Abu Bakr al-Siddiq (may Allah be pleased with him) left Makkah secretly after Allah permitted the migration. They hid in the Cave of Thawr for three nights while Quraysh searched for them, then took the coastal road to Madinah.`,
    story: [
      `When Quraysh's persecution intensified and the assembly of Dar al-Nadwa plotted to kill the Prophet ﷺ — with a youth from every clan striking him a single blow together — Allah permitted him to migrate. He came to Abu Bakr at midday, veiled, and said: "I have been given permission to depart."`,
      `ʿAli ibn Abi Talib slept in the Prophet's ﷺ bed to mislead those lying in wait and to return the trusts to their owners. He ﷺ and Abu Bakr left through a small window in Abu Bakr's house toward the Cave of Thawr south of Makkah — the opposite direction to Madinah — and stayed there three nights.`,
      `Such was Allah's gentleness that the pagans stood at the mouth of the cave. Abu Bakr said: O Messenger of Allah, if one of them looked beneath his feet he would see us. He ﷺ said: "O Abu Bakr, what do you think of two whose third is Allah?" And Allah revealed: "Do not grieve; indeed Allah is with us."`,
    ],
    source: `Sahih al-Bukhari · Ibn Hisham, al-Sira al-Nabawiyya`,
    disputed: `It is well known that he ﷺ left Makkah in late Safar or the beginning of Rabiʿ al-Awwal of year 1; the reports differ on fixing the exact night.`,
  },
  'granada-fall': {
    year: `897 AH`,
    title: `The fall of Granada, the last stronghold of al-Andalus`,
    summary: `Abu ʿAbdullah (Boabdil), the last of the Nasrid kings, handed the keys of Granada and the Alhambra to Ferdinand and Isabella, folding the page on eight centuries of Islamic civilization in al-Andalus.`,
    story: [
      `After the fall of Cordoba and Seville, the kingdom of Granada remained for two and a half centuries the last stronghold of Islam in the Iberian Peninsula — until the kingdoms of Castile and Aragon united through the marriage of Ferdinand and Isabella, and the Nasrids were exhausted by internal strife.`,
      `The Spanish besieged Granada for months until hunger gripped it, and Abu ʿAbdullah Muhammad XII (Boabdil) signed the terms of surrender, which guaranteed the Muslims security in their lives, faith and property — pledges soon broken by the Inquisition and forced conversion.`,
      `On 2 Rabiʿ al-Awwal 897 AH (2 January 1492) the Catholic monarchs entered the city and the cross was raised over the Alhambra. Boabdil paused on a height overlooking the city, weeping, and his mother ʿAʾisha spoke her famous words: "Weep like a woman for a kingdom you did not defend like a man."`,
    ],
    source: `al-Maqqari, Nafh al-Tib min Ghusn al-Andalus al-Ratib`,
  },
  'mehmed-fatih-death': {
    year: `886 AH`,
    title: `The death of Sultan Mehmed the Conqueror`,
    summary: `The Ottoman Sultan Mehmed II, conqueror of Constantinople, died on his way to a new campaign whose destination he kept secret, at the age of forty-nine, after he had changed the face of history by conquering the capital of the Byzantines.`,
    story: [
      `Mehmed II assumed the sultanate young, at twenty-one, and soon fulfilled the dream that Muslims had cherished for eight centuries by conquering Constantinople in 857 AH. He was titled "the Conqueror," and the city became the capital of his state.`,
      `He did not stop after the conquest; he annexed Serbia, the Morea, Bosnia, Trebizond and the Crimea, and organized the state with his famous Kanunname. With all this he loved learning and scholars, mastered several languages, and gathered jurists, philosophers and poets in his court.`,
      `On 4 Rabiʿ al-Awwal 886 AH (May 1481) he died in his camp near Üsküdar while preparing a great campaign whose destination he had kept even from those closest to him — some say he intended Italy — and he was buried in the Fatih Mosque in Istanbul.`,
    ],
    source: `Sources of Ottoman history · Ibn Iyas, Badaʾiʿ al-Zuhur`,
  },
  'quba-arrival': {
    year: `1 AH`,
    title: `The Prophet's ﷺ arrival at Qubaʾ and the founding of the first mosque`,
    summary: `The blessed journey of the Hijra ended with the Prophet ﷺ and his companion reaching Qubaʾ on the outskirts of Madinah, where he stayed among Banu ʿAmr ibn ʿAwf and founded the Mosque of Qubaʾ — the first mosque built in Islam, founded upon piety.`,
    story: [
      `The people of Yathrib would go out each morning to the harra to await the Hijra caravan until the sun's heat sent them back. When the caravan appeared, a Jewish man climbed up and cried: O Banu Qayla, this is your grandfather whom you await! The Muslims rushed to arms in joy and welcome.`,
      `He ﷺ stayed at Qubaʾ among Banu ʿAmr ibn ʿAwf, as the guest of Kulthum ibn al-Hadm, and spent several nights there in which he founded the Mosque of Qubaʾ, of which Allah said: "A mosque founded on piety from the first day is more worthy that you stand in it." He worked in its building with his own noble hands.`,
      `Then, on Friday, he rode to Madinah, and the prayer overtook him among Banu Salim, where he led the first Jumuʿa. He entered Madinah as the people cried: The Prophet of Allah has come! The day of his arrival was the brightest in its history, and the year of the Hijra became the epoch of the Ummah's calendar.`,
    ],
    source: `Ibn Hisham, al-Sira al-Nabawiyya · Sahih al-Bukhari (the chapter on the Hijra)`,
    disputed: `The well-known view is that he reached Qubaʾ on Monday 8 Rabiʿ al-Awwal and entered Madinah on Friday the 12th; the reports differ between the 8th and the 12th.`,
  },
  'mawlid': {
    year: `Year of the Elephant`,
    title: `The birth of the Prophet Muhammad ﷺ`,
    summary: `The master of the children of Adam, Muhammad ibn ʿAbdullah ﷺ, was born in Makkah in the Year of the Elephant, on a Monday of Rabiʿ al-Awwal, fatherless, among Banu Hashim, the noblest of the houses of the Arabs — his birth the dawn of a new history for humankind.`,
    story: [
      `He ﷺ was born in the Year of the Elephant — the year in which Allah destroyed the People of the Elephant who came to demolish the Kaʿba. His father ʿAbdullah died before his birth, so his grandfather ʿAbd al-Muttalib, then his uncle Abu Talib, cared for him, and Halima al-Saʿdiyya nursed him among the desert of Banu Saʿd.`,
      `It is authentically reported that when he ﷺ was asked about fasting Monday, he said: "That is a day on which I was born and a day on which I was sent — or on which revelation came to me." So it is established, without dispute, that his birth was on a Monday.`,
      `He ﷺ grew up in Makkah known as the Truthful and Trustworthy, until Allah sent him at forty as a mercy to the worlds. He brought people from darkness into light and left his Ummah on a clear path, its night like its day.`,
    ],
    source: `Ibn Hisham, al-Sira al-Nabawiyya · Sahih Muslim (fasting Monday) · Ibn Kathir, al-Bidaya wa'l-Nihaya`,
    disputed: `It is agreed that he was born on a Monday in Rabiʿ al-Awwal of the Year of the Elephant; the day is disputed — the 2nd, 8th, 9th and 12th are reported — the most famous among the majority being 12 Rabiʿ al-Awwal, while some modern astronomers favour the 9th.`,
  },
  'prophet-death': {
    year: `11 AH`,
    title: `The death of the Prophet Muhammad ﷺ`,
    summary: `The Messenger of Allah ﷺ passed to the Highest Companion in the forenoon of Monday 12 Rabiʿ al-Awwal 11 AH, in the house of ʿAʾisha (may Allah be pleased with her), after Allah had perfected the religion through him and completed His favour — the greatest calamity to befall the Ummah.`,
    story: [
      `The illness of the Messenger of Allah ﷺ grew severe over days, so he ordered Abu Bakr to lead the people in prayer. Then, on Monday morning, he looked out at them from ʿAʾisha's chamber as they stood in rows for Fajr, and he smiled. They thought he was coming out to them; then he let down the curtain and passed away in the forenoon of that day.`,
      `The Muslims were thrown into confusion, until ʿUmar said: The Messenger of Allah has not died! Then Abu Bakr rose and delivered his immortal words: "Whoever worshipped Muhammad — Muhammad has died; and whoever worshipped Allah — Allah is Living and does not die," and recited: "Muhammad is but a messenger; messengers have passed before him."`,
      `The Ansar gathered at the Saqifa of Banu Saʿida, and the Muslims pledged allegiance to Abu Bakr al-Siddiq as caliph. The Prophet ﷺ was washed and buried where he died, in ʿAʾisha's chamber, on the night of Wednesday, at sixty-three years of age — the blessings and peace of Allah be upon him.`,
    ],
    source: `Sahih al-Bukhari · Ibn Hisham, al-Sira al-Nabawiyya`,
    disputed: `There is no dispute that he died on a Monday of Rabiʿ al-Awwal 11 AH; the well-known view is the 12th, and some say the 2nd, owing to a calculational difficulty in the standing at ʿArafa of the Farewell Pilgrimage.`,
  },
  'imam-ahmad-death': {
    year: `241 AH`,
    title: `The death of Imam Ahmad ibn Hanbal`,
    summary: `The imam of Ahl al-Sunnah, Ahmad ibn Hanbal — author of the Musnad and hero of the ordeal over the "createdness of the Qur'an," who stood firm when others wavered — died in Baghdad, and was accompanied by a funeral procession the like of which Baghdad had never seen.`,
    story: [
      `Imam Ahmad was born in 164 AH and grew up an orphan in Baghdad. He sought hadith until he travelled to the lands and compiled the "Musnad" of some thirty thousand hadiths. al-Shafiʿi said of him: "I left Baghdad and did not leave behind anyone more learned in jurisprudence or more scrupulous than Ahmad ibn Hanbal."`,
      `He was tested in the ordeal of the doctrine that the Qur'an was created, in the days of al-Maʾmun, al-Muʿtasim and al-Wathiq. He was imprisoned and flogged until he fainted, yet held firm to his position: the Qur'an is the speech of Allah, uncreated. Through him Allah preserved the creed of the Ummah, and the people named him the imam of Ahl al-Sunnah.`,
      `He died in the forenoon of Friday 12 Rabiʿ al-Awwal 241 AH; Baghdad shut its markets, and his funeral was reckoned at hundreds of thousands, unlike anything known before, until it was said: Say to the people of innovation — between us and you is the day of funerals.`,
    ],
    source: `al-Dhahabi, Siyar Aʿlam al-Nubalaʾ · Ibn al-Jawzi, Manaqib al-Imam Ahmad`,
  },
  'imam-malik-death': {
    year: `179 AH`,
    title: `The death of Imam Malik ibn Anas`,
    summary: `The imam of the abode of the Hijra, Malik ibn Anas, author of "al-Muwattaʾ," died in Madinah. To him passed the leadership of jurisprudence and hadith in Madinah, and to him the Maliki school — one of the four schools — is ascribed.`,
    story: [
      `Malik was born in Madinah around 93 AH and studied under Nafiʿ, the freedman of Ibn ʿUmar, and Ibn Shihab al-Zuhri and others, until he became the landmark of Madinah to whom mounts were driven from afar. Of him it was said: "No fatwa is given while Malik is in Madinah."`,
      `He compiled "al-Muwattaʾ" with extreme care, selecting it from a hundred thousand hadiths and refining it over forty years. al-Shafiʿi said: "After the Book of Allah there is no book more correct than the Muwattaʾ of Malik."`,
      `He was awe-inspiring and dignified, honouring the hadith of the Messenger of Allah ﷺ so that he would narrate only in purity and calm. He died in Madinah in 179 AH and was buried in al-Baqiʿ. His school today is that of the people of the Arab Maghrib, West Africa and parts of the Gulf.`,
    ],
    source: `al-Dhahabi, Siyar Aʿlam al-Nubalaʾ · Ibn Khallikan, Wafayat al-Aʿyan`,
    disputed: `The well-known view is that he died in Rabiʿ al-Awwal 179 AH; some say in Safar; and of the day, the most famous reports are the 11th and 14th of Rabiʿ al-Awwal.`,
  },
  'masjid-nabawi-founding': {
    year: `1 AH`,
    title: `The founding of the Prophet's Mosque`,
    summary: `After the Prophet ﷺ entered Madinah, his she-camel knelt at a drying-yard belonging to two orphan boys. He ﷺ bought it and built there his noble mosque and living quarters, working in its construction with his own hands alongside his Companions.`,
    story: [
      `When the Prophet ﷺ entered Madinah, the Ansar took hold of his she-camel's rein, each wanting him as a guest, so he said: "Leave her, for she is commanded," until she knelt at a drying-yard belonging to Sahl and Suhayl, two orphan boys of Banu al-Najjar. He bought it from them and stayed with Abu Ayyub al-Ansari until the building was complete.`,
      `The mosque was built of mud-brick, its roof of palm branches and its pillars of palm trunks. He ﷺ worked in it himself, carrying the bricks with his Companions as they chanted: "O Allah, there is no life but the life of the Hereafter; so forgive the Ansar and the Emigrants."`,
      `The Prophet's Mosque became the heart of the new state: prayer, gatherings of revelation and knowledge, the tying of banners and the receiving of delegations. He ﷺ said: "A prayer in this mosque of mine is better than a thousand prayers elsewhere, except the Sacred Mosque."`,
    ],
    source: `Ibn Hisham, al-Sira al-Nabawiyya · Sahih al-Bukhari`,
    disputed: `Construction began after his ﷺ arrival in Madinah in Rabiʿ al-Awwal of year 1; the sources do not fix the exact day it began.`,
  },

  // ————————————————— Rabiʿ al-Akhir —————————————————
  'jilani-death': {
    year: `561 AH`,
    title: `The death of Shaykh ʿAbd al-Qadir al-Jilani`,
    summary: `The Hanbali shaykh ʿAbd al-Qadir al-Jilani — the ascetic preacher whose renown filled the horizons and from whose gatherings countless people benefited — died in Baghdad. To him the Qadiri order is ascribed.`,
    story: [
      `ʿAbd al-Qadir was born in Jilan near the Caspian Sea around 470 AH and came to Baghdad as a poor youth. He studied jurisprudence in the school of Imam Ahmad, along with hadith and literature, then devoted himself to asceticism and spiritual striving for years.`,
      `He sat to preach, and thousands gathered to his assembly; many embraced Islam at his hands and repented in his gatherings. He taught jurisprudence, tafsir and hadith in his famous school, and among his works are "al-Ghunya li-Talibi Tariq al-Haqq" and "Futuh al-Ghayb."`,
      `He died in Baghdad in 561 AH at about ninety years of age and was buried in his school. al-Dhahabi said: "Shaykh ʿAbd al-Qadir was of great standing, but after his death tales were ascribed to him that are not sound" — so his due is respect without excess.`,
    ],
    source: `al-Dhahabi, Siyar Aʿlam al-Nubalaʾ · Ibn Rajab, Dhayl Tabaqat al-Hanabila`,
    disputed: `The well-known view is that he died on 8 Rabiʿ al-Akhir 561 AH; some say the 11th of it.`,
  },
  'abbasid-bayah-saffah': {
    year: `132 AH`,
    title: `The rise of the Abbasid state and the pledge to al-Saffah`,
    summary: `Abu'l-ʿAbbas ʿAbdullah ibn Muhammad, titled al-Saffah, was given the pledge of the caliphate in the mosque of Kufa — and with it arose the Abbasid state, which ruled the Muslim world for more than five centuries.`,
    story: [
      `The Abbasid call set out secretly from Khurasan under the slogan "the accepted one from the family of Muhammad," led by Abu Muslim al-Khurasani, until the armies of the Umayyads crumbled before it, and the Abbasids entered Kufa in 132 AH.`,
      `In the congregational mosque of Kufa, Abu'l-ʿAbbas ascended the pulpit; the people pledged the caliphate to him, and he delivered his famous sermon in which he named himself "al-Saffah," announcing the start of a new era and a state that raised the black banner as its emblem.`,
      `Only months passed before the Umayyad state collapsed at the Battle of the Zab, and the Abbasid state was consolidated. It would move the capital to Baghdad and, in its golden age, witness the most brilliant era of Islamic civilization in knowledge and construction.`,
    ],
    source: `al-Tabari, Tarikh al-Rusul wa'l-Muluk · Ibn al-Athir, al-Kamil fi'l-Tarikh`,
    disputed: `The well-known view is that the general pledge was on 12 Rabiʿ al-Akhir 132 AH; some reports say the 13th, and some place it in Rabiʿ al-Awwal.`,
  },
  'hattin': {
    year: `583 AH`,
    title: `The Battle of Hattin`,
    summary: `Salah al-Din al-Ayyubi crushed the Crusader army at the Horns of Hattin near Tiberias, capturing the king of Jerusalem and his senior commanders. The victory opened the road to recovering Jerusalem only months later.`,
    story: [
      `Salah al-Din gathered his forces from Egypt, Syria and the Jazira, some thirty thousand strong, and lured the Crusader army out of its safe camp at Saffuriya across parched heights in the scorching July, after attacking Tiberias.`,
      `The Muslims closed in upon the Crusaders at the hills of the Horns of Hattin, drained by thirst, and set fire to the grass around them. When the battle cleared on Saturday 25 Rabiʿ al-Akhir 583 AH (4 July 1187), the Crusader army had been annihilated between slain and captive.`,
      `King Guy of Lusignan was captured, and Reynald of Châtillon, lord of Kerak and breaker of treaties, was seized — Salah al-Din killed him with his own hand, fulfilling his oath. After it the coast fell fortress by fortress, until Salah al-Din entered Jerusalem in Rajab of the same year.`,
    ],
    source: `Ibn al-Athir, al-Kamil fi'l-Tarikh · Ibn Shaddad, al-Nawadir al-Sultaniyya`,
    disputed: `The great battle took place on Saturday 25 Rabiʿ al-Akhir; its prelude was on the 24th, so some sources mention both days together.`,
  },
  // ————————————————— Jumada al-Ula —————————————————
  'bayhaqi-death': {
    year: `458 AH`,
    title: `The death of Imam al-Bayhaqi`,
    summary: `The hafiz Abu Bakr Ahmad ibn al-Husayn al-Bayhaqi — author of "al-Sunan al-Kubra" and "Shuʿab al-Iman," and one of the greatest to serve the Prophetic hadith and Shafiʿi jurisprudence through his writings — died in Nishapur.`,
    story: [
      `al-Bayhaqi was born in 384 AH in Khusrawjird, a village of Bayhaq near Nishapur. He heard from al-Hakim, author of "al-Mustadrak," and his generation, and combined memorization, jurisprudence and legal theory until he became one of the landmarks of his age.`,
      `He wrote nearly a thousand volumes, most famous among them "al-Sunan al-Kubra," of which the scholars said none has its like, as well as "Dalaʾil al-Nubuwwa," "Shuʿab al-Iman" and "Maʿrifat al-Sunan wa'l-Athar." It was said: were it not for al-Bayhaqi, the school of al-Shafiʿi would have remained scattered in the depths of books.`,
      `Imam al-Haramayn al-Juwayni said: "There is no Shafiʿi but that al-Shafiʿi has a favour upon him, except al-Bayhaqi, for he has a favour upon al-Shafiʿi." He died in Nishapur on 10 Jumada al-Ula 458 AH, and his body was carried to his town of Bayhaq and buried there.`,
    ],
    source: `al-Dhahabi, Siyar Aʿlam al-Nubalaʾ · al-Subki, Tabaqat al-Shafiʿiyya al-Kubra`,
  },
  'mutah': {
    year: `8 AH`,
    title: `The Battle of Muʾta`,
    summary: `Three thousand Muslims met the massed Byzantines and their allies at Muʾta in the land of Syria. The three commanders — Zayd ibn Haritha, Jaʿfar ibn Abi Talib and ʿAbdullah ibn Rawaha — were martyred, and Khalid ibn al-Walid saved the army by a masterful withdrawal.`,
    story: [
      `The Prophet ﷺ sent al-Harith ibn ʿUmayr as an envoy to the ruler of Busra, but Shurahbil al-Ghassani killed him — no envoy of the Messenger of Allah ﷺ was killed but him — so he prepared an army of three thousand and appointed Zayd ibn Haritha; if he fell, then Jaʿfar; if he fell, then Ibn Rawaha.`,
      `The Muslims were confronted by the Byzantines and their Arab allies in the hundreds of thousands. They pressed on to Muʾta and fought an astonishing fight; the three commanders were martyred one after another, and Jaʿfar's two hands were severed as he held the banner, until he embraced it — so he was named "the one with two wings."`,
      `Khalid ibn al-Walid took the banner, drew the army aside and rescued it from annihilation by a brilliant manoeuvre. The Prophet ﷺ announced the martyrs' deaths to his Companions in Madinah before the news arrived, his eyes overflowing, and said of Khalid: "A sword among the swords of Allah."`,
    ],
    source: `Sahih al-Bukhari · Ibn Hisham, al-Sira al-Nabawiyya`,
    disputed: `It took place in Jumada al-Ula 8 AH by the agreement of the biographers; its exact day is not established.`,
  },
  'suyuti-death': {
    year: `911 AH`,
    title: `The death of Imam Jalal al-Din al-Suyuti`,
    summary: `The hafiz Jalal al-Din al-Suyuti — author of more than six hundred works in tafsir, hadith, language and history, among them "al-Itqan," "al-Jamiʿ al-Saghir" and "Tafsir al-Jalalayn" — died in Cairo.`,
    story: [
      `al-Suyuti was born in 849 AH and grew up an orphan in Cairo. He memorized the Qur'an before the age of eight, and pursued knowledge until he said of himself: I was granted deep mastery of seven sciences, and he issued fatwas and taught at twenty years of age.`,
      `He wrote more than six hundred works between books and treatises, among them "al-Itqan fi ʿUlum al-Qur'an," "al-Durr al-Manthur," "Tadrib al-Rawi," "Tarikh al-Khulafaʾ" and "al-Muzhir," and completed "Tafsir al-Jalalayn," begun by his teacher Jalal al-Din al-Mahalli.`,
      `Late in life he withdrew from people on the Rawda island of the Nile, writing and worshipping, and refused gifts and offices, until he died on 19 Jumada al-Ula 911 AH and was buried in Hush Qawsun outside Bab al-Qarafa in Cairo.`,
    ],
    source: `al-Shawkani, al-Badr al-Taliʿ · Najm al-Din al-Ghazzi, al-Kawakib al-Saʾira`,
  },
  'constantinople-conquest': {
    year: `857 AH`,
    title: `The Conquest of Constantinople`,
    summary: `Sultan Mehmed II entered Constantinople after a siege of fifty-four days. The capital of the Byzantine Empire, which had resisted conquerors for eight centuries, fell, and the Prophetic glad tiding was fulfilled.`,
    story: [
      `Mehmed II mustered some quarter of a million fighters and giant cannon the like of which history had not known — the most famous being the Sultanic cannon cast by Orban — and laid siege to the city, protected by the greatest walls in the world, on 26 Rabiʿ al-Awwal 857 AH.`,
      `When the Byzantines closed the Golden Horn with chains, the Sultan ordered seventy ships dragged over greased planks across the hills in a single night, so that they appeared in the heart of the inlet — one of the most astonishing stratagems in history.`,
      `At dawn on Tuesday 20 Jumada al-Ula 857 AH (29 May 1453) the Ottomans stormed the walls, the emperor Constantine was killed, and the young Sultan — twenty-two years old — entered the city and was named "the Conqueror." The people recalled the hadith: "Constantinople will surely be conquered; what an excellent commander is its commander, and what an excellent army is that army."`,
    ],
    source: `Sources of Ottoman and Byzantine history · Musnad Imam Ahmad (the hadith of the glad tiding)`,
  },
  'ajnadayn': {
    year: `13 AH`,
    title: `The Battle of Ajnadayn`,
    summary: `The Muslims under Khalid ibn al-Walid defeated the massed Byzantines at Ajnadayn in Palestine, in the first great confrontation with the armies of Heraclius, opening the way for the conquest of all of Syria.`,
    story: [
      `When the commanders in Syria appealed to Abu Bakr al-Siddiq (may Allah be pleased with him) against the Byzantine hosts, he ordered Khalid ibn al-Walid to march from Iraq. Khalid crossed the desert of Samawa in a swift, legendary march and took command of the assembled armies.`,
      `The two hosts met at Ajnadayn between al-Ramla and Bayt Jibrin. The Byzantines were tens of thousands, yet the Muslims held firm and fought excellently until the Byzantines were routed in a crushing defeat, and a number of the best Companions were martyred.`,
      `Ajnadayn was the key to Syria, for it broke the strength of the Byzantines in Palestine. It was followed by Yarmuk, then the conquest of Damascus and Jerusalem. The glad tiding reached Abu Bakr on his deathbed, and it gladdened him.`,
    ],
    source: `al-Tabari, Tarikh al-Rusul wa'l-Muluk · al-Baladhuri, Futuh al-Buldan`,
    disputed: `The well-known view places it in Jumada al-Ula 13 AH; some say Jumada al-Akhira. Its day is disputed, and some mention 28 Jumada al-Ula.`,
  },

  // ————————————————— Jumada al-Akhira —————————————————
  'harun-rashid-death': {
    year: `193 AH`,
    title: `The death of Caliph Harun al-Rashid`,
    summary: `The Abbasid caliph Harun al-Rashid died at Tus in Khurasan while on his way to quell a rebellion, after twenty-three years of rule in which the Abbasid state reached the peak of its power and prosperity.`,
    story: [
      `Harun al-Rashid assumed the caliphate in 170 AH as a young man, and his era witnessed the height of the golden age: Baghdad the greatest city in the world, the House of Wisdom translating the sciences of nations, and wealth flowing so that it was said he would address the cloud: Rain where you wish, for your tribute will come to me.`,
      `With all this he was frequent in jihad and Hajj; it is related that he would perform Hajj one year and campaign the next, and he raided the land of the Byzantines in person several times. The kings of the earth feared him, his fame spread across the horizons, and his name entered world literature in "One Thousand and One Nights."`,
      `He set out himself, though ill, to quell the revolt of Rafiʿ ibn al-Layth beyond the river. His illness worsened at Tus, and he died there in Jumada al-Akhira 193 AH at about forty-five years of age, and was buried there. With his death began the strife between his sons al-Amin and al-Maʾmun.`,
    ],
    source: `al-Tabari, Tarikh al-Rusul wa'l-Muluk · al-Dhahabi, Siyar Aʿlam al-Nubalaʾ`,
    disputed: `He died in Jumada al-Akhira 193 AH; the well-known view is the night of Saturday, the third of it, though some sources differ slightly over the day.`,
  },
  'battle-of-jamal': {
    year: `36 AH`,
    title: `The Battle of the Camel`,
    summary: `The painful confrontation took place at Basra between the army of the caliph ʿAli ibn Abi Talib and the camp of ʿAʾisha, Talha and al-Zubayr (may Allah be pleased with them) — the first fighting between Muslims — ending with the deaths of Talha and al-Zubayr and ʿAʾisha's honoured return.`,
    story: [
      `After the martyrdom of ʿUthman (may Allah be pleased with him) and the pledge to ʿAli, the Mother of the Believers ʿAʾisha set out with Talha and al-Zubayr to Basra demanding retribution against the killers of ʿUthman. Reconciliation between the two sides was nearly reached, but for the schemers of the strife who ignited the fighting by night.`,
      `The battle revolved around the Mother of the Believers' camel, so it was named after it. In it Talha and al-Zubayr were martyred — al-Zubayr had withdrawn from the fighting, reminded of a hadith of the Prophet ﷺ, and was killed treacherously — along with many Muslims.`,
      `ʿAli honoured the Mother of the Believers and sent her to Madinah with respect. All regretted what had happened, and Ahl al-Sunnah withhold their tongues from what passed between the Companions and seek forgiveness for them all: "Our Lord, forgive us and our brothers who preceded us in faith."`,
    ],
    source: `al-Tabari, Tarikh al-Rusul wa'l-Muluk · Ibn Kathir, al-Bidaya wa'l-Nihaya`,
    disputed: `The well-known view is that it occurred on 10 Jumada al-Akhira 36 AH; some place it in mid Jumada al-Ula.`,
  },
  'battle-of-zab': {
    year: `132 AH`,
    title: `The Battle of the Zab and the end of the Umayyad state`,
    summary: `The last Umayyad caliph, Marwan ibn Muhammad, was defeated by the Abbasid army at the Great Zab river near Mosul. The Umayyad state collapsed after some ninety years of rule, and upon its ruins arose the Abbasid state.`,
    story: [
      `Marwan ibn Muhammad — among the bravest and hardest of the Umayyads, nicknamed "the Donkey of the Jazira" for his endurance — set out with the hosts of Syria and the Jazira to meet the advancing Abbasid army under ʿAbdullah ibn ʿAli, uncle of al-Saffah.`,
      `The two hosts met on the bank of the Great Zab. The Khurasanis held firm with their ordered ranks and their method of kneeling behind their spears; Marwan's army broke, many drowned in the river, and Marwan fled without pause.`,
      `The Abbasids pursued him from the Jazira to Syria and then to Egypt, until he was killed at Busir in its south. With his death the page of the Umayyad state in the East was folded, and ʿAbd al-Rahman al-Dakhil escaped among the Umayyads to found for them a new realm in al-Andalus.`,
    ],
    source: `al-Tabari, Tarikh al-Rusul wa'l-Muluk · Ibn al-Athir, al-Kamil fi'l-Tarikh`,
  },
  'ghazali-death': {
    year: `505 AH`,
    title: `The death of Abu Hamid al-Ghazali`,
    summary: `The Proof of Islam, Abu Hamid al-Ghazali — author of "Ihyaʾ ʿUlum al-Din," the jurist, legal theorist and theologian who abandoned the leadership of teaching in Baghdad and set out on a famous ascetic journey that changed the course of his life and thought — died at Tus.`,
    story: [
      `al-Ghazali was born at Tus in 450 AH and studied under Imam al-Haramayn al-Juwayni until he excelled in jurisprudence, legal theory and theology. Nizam al-Mulk appointed him to teach at the Nizamiyya school in Baghdad before he was forty; his fame spread and students thronged to him.`,
      `Then a deep spiritual crisis befell him, which he recounted in "al-Munqidh min al-Dalal." He left rank and teaching and set out stripped of the world for about ten years between Damascus, Jerusalem and the Hijaz, writing during it his most famous book, "Ihyaʾ ʿUlum al-Din," on the reform of hearts and deeds.`,
      `He finally returned to Tus to teach and worship until he died on 14 Jumada al-Akhira 505 AH at fifty-five, leaving a vast legacy including "al-Mustasfa" in legal theory and "Tahafut al-Falasifa," which shook Greek philosophy in the Muslim world.`,
    ],
    source: `Ibn Khallikan, Wafayat al-Aʿyan · al-Dhahabi, Siyar Aʿlam al-Nubalaʾ`,
  },
  'abu-bakr-death': {
    year: `13 AH`,
    title: `The death of Abu Bakr al-Siddiq (may Allah be pleased with him)`,
    summary: `The successor of the Messenger of Allah ﷺ, Abu Bakr al-Siddiq, died in Madinah after a caliphate of two years and three months by which Allah preserved Islam: he fought the apostates, gathered the Qur'an, sent armies to conquer Iraq and Syria, and entrusted the affair to ʿUmar.`,
    story: [
      `Abu Bakr was the first man to believe, the Prophet's ﷺ companion in the cave and the Hijra, and the anchor of the Ummah on the day of his death. When he assumed the caliphate he faced the apostasy of the Arabs with a resolve like mountains, saying: "By Allah, if they withheld from me a hobbling-cord they used to give to the Messenger of Allah, I would fight them for it."`,
      `In his short caliphate the Qur'an was gathered into a single volume on ʿUmar's counsel after the reciters were killed at Yamama, and the armies of conquest set out for Iraq and Syria — while he lived the life of the poorest of the Emigrants.`,
      `He fell ill for fifteen days, consulted the senior Companions, and entrusted the caliphate to ʿUmar ibn al-Khattab to close the door on division. He died on the night of Tuesday, with eight nights remaining of Jumada al-Akhira 13 AH, at sixty-three years, and was buried beside his companion ﷺ in ʿAʾisha's chamber.`,
    ],
    source: `al-Tabari, Tarikh al-Rusul wa'l-Muluk · al-Dhahabi, Siyar Aʿlam al-Nubalaʾ`,
    disputed: `The well-known view is that he died on the night of 22 Jumada al-Akhira 13 AH; some say the 23rd.`,
  },
  // ————————————————— Rajab —————————————————
  'tabuk': {
    year: `9 AH`,
    title: `The Expedition of Tabuk — the Army of Hardship`,
    summary: `The Prophet ﷺ set out with thirty thousand to Tabuk in the far north to face the Byzantines, in severe heat and evident hardship. He met no fighting; it was his last expedition and the greatest lesson in truthfulness and sacrifice.`,
    story: [
      `News reached the Prophet ﷺ of the Byzantines massing on the edges of Syria, so — contrary to his custom — he declared his destination openly, given the distance, the fierce heat and the ripe fruits. He urged giving, so ʿUthman equipped a third of the army, Abu Bakr brought all his wealth, and ʿUmar half of his.`,
      `The Army of Hardship, thirty thousand strong, marched squeezing dates for moisture and taking turns on a single camel. The hypocrites stayed behind, and among the truthful three stayed behind whose repentance Surat al-Tawba immortalized in the famous account of Kaʿb ibn Malik.`,
      `He ﷺ stayed at Tabuk about twenty nights and met no fighting with the Byzantines. He made peace with the people of Ayla, Adhruh and Dumat al-Jandal on payment of the jizya, so the expedition firmly established the awe of the Muslim state on the Byzantine frontier and paved the way for the conquest of Syria after him.`,
    ],
    source: `Ibn Hisham, al-Sira al-Nabawiyya · Sahih al-Bukhari (the hadith of Kaʿb ibn Malik)`,
    disputed: `He ﷺ set out to it in Rajab 9 AH according to Ibn Ishaq; the day of departure is not fixed.`,
  },
  'nakhla-expedition': {
    year: `2 AH`,
    title: `The Expedition of ʿAbdullah ibn Jahsh and the verse on the sacred months`,
    summary: `The Prophet ﷺ sent ʿAbdullah ibn Jahsh with a small party to Nakhla to watch a Quraysh caravan. They killed a man on the last day of the sacred month of Rajab; Quraysh raised an outcry, and Allah sent down His decisive ruling on fighting in the sacred month.`,
    story: [
      `The Prophet ﷺ gave ʿAbdullah ibn Jahsh a letter and ordered him not to open it until after two days. When he opened it, it directed him to Nakhla, between Makkah and al-Taʾif, to watch Quraysh. He said: To hear is to obey, and his companions went with him willingly.`,
      `A Quraysh caravan bearing trade passed by them, and the party — for it was the last day of Rajab — deliberated between violating the sacred month or letting the caravan escape. They loosed arrows, killed ʿAmr ibn al-Hadrami and captured two men. The Prophet ﷺ deferred the matter and censured them.`,
      `Quraysh spread the claim that Muhammad had made lawful the sacred month, so Allah revealed: "They ask you about the sacred month — about fighting in it. Say: fighting in it is a great sin, but averting from the path of Allah and disbelief in Him... and persecution is worse than killing." The verse set the balance: the month's sanctity is great, but turning people from their religion is greater.`,
    ],
    source: `Ibn Hisham, al-Sira al-Nabawiyya · al-Tabari, Jamiʿ al-Bayan (the exegesis of al-Baqara 217)`,
    disputed: `The fighting was on the last day of Rajab 2 AH according to the well-known view; some say the first night of Shaʿban, owing to uncertainty in sighting the crescent.`,
  },
  'yarmouk': {
    year: `15 AH`,
    title: `The Battle of Yarmuk`,
    summary: `The Muslims, around thirty-six thousand, met the massed Byzantines — over two hundred thousand — on the banks of the Yarmuk. Allah decreed for them a decisive victory that expelled the Byzantines from Syria for good.`,
    story: [
      `Heraclius mustered his greatest armies to recover Syria, so the Muslims drew back to the plain of Yarmuk. Khalid ibn al-Walid united the armies and divided them into companies, and spoke his words: "This is a day of the days of Allah; there should be neither boasting nor transgression in it."`,
      `The Muslims withstood the crushing Byzantine assaults for days; the women stood behind the ranks turning back any who fled, until Khalid launched his general attack, closing upon the Byzantines and driving them to the ravine of al-Waqusa, where thousands of them plunged into its gorges.`,
      `Tens of thousands of Byzantines were killed and about three thousand Muslims were martyred, among them ʿIkrima ibn Abi Jahl. Heraclius spoke his famous farewell: "Peace be upon you, O Syria — the farewell of one who does not return." Yarmuk was the day the Byzantines left Syria forever.`,
    ],
    source: `al-Tabari, Tarikh al-Rusul wa'l-Muluk · Ibn Kathir, al-Bidaya wa'l-Nihaya`,
    disputed: `The well-known view of Ibn Ishaq and al-Tabari places it in Rajab 15 AH; others, such as Sayf ibn ʿUmar, place it in 13 AH, immediately after Ajnadayn.`,
  },
  'zallaqa': {
    year: `479 AH`,
    title: `The Battle of Zallaqa`,
    summary: `Yusuf ibn Tashfin, the Almoravid emir, crossed the sea to aid the kings of al-Andalus, and together with al-Muʿtamid ibn ʿAbbad met the army of Alfonso VI on the plain of Zallaqa near Badajoz, inflicting a crushing defeat that halted the Castilian advance for a whole generation.`,
    story: [
      `When Toledo fell in 478 AH and Alfonso VI pressed the party-kings hard, they appealed to the commander of the Muslims Yusuf ibn Tashfin, lord of Marrakesh, and al-Muʿtamid ibn ʿAbbad spoke his immortal words: "Herding camels is better than herding swine."`,
      `Ibn Tashfin crossed with the Almoravid armies, al-Muʿtamid and the party-kings joined him, and the two hosts met on Friday 12 Rajab 479 AH (October 1086) on the plain of Zallaqa. al-Muʿtamid stood firm in the vanguard like a hero until wounds covered him.`,
      `Then Ibn Tashfin struck with his plan: he encircled the Castilian camp with his reserve divisions and drums that shook the earth, and Alfonso fled with a small, wounded remnant. Zallaqa delayed the fall of al-Andalus for centuries and prepared the way for the Almoravid state there.`,
    ],
    source: `ʿAbd al-Wahid al-Marrakushi, al-Muʿjib · Ibn al-Athir, al-Kamil fi'l-Tarikh`,
  },
  'umar-abdulaziz-death': {
    year: `101 AH`,
    title: `The death of Caliph ʿUmar ibn ʿAbd al-ʿAziz`,
    summary: `The fifth Rightly-Guided Caliph, ʿUmar ibn ʿAbd al-ʿAziz, died at Dayr Simʿan after two and a half years of a caliphate in which he filled the earth with justice — until, it was said, a man would come out with his zakat and find no poor person to accept it.`,
    story: [
      `ʿUmar ibn ʿAbd al-ʿAziz assumed the caliphate in 99 AH, wept, and said: It is a trial and a test. Then he began with himself, returning estates and jewels to the public treasury and holding his family to the same. He lived the life of ascetics though he was a caliph to whom the world was gathered.`,
      `He returned wrongfully taken property to its owners, whoever they were, abolished the taxes that burdened people, and ordered his governors to justice and to withhold harm — until wealth overflowed in his caliphate, and it was called out: Where are the debtors? Where are those seeking marriage? — until all were enriched.`,
      `He ordered Abu Bakr ibn Hazm to record the Sunnah for fear that knowledge would be lost — the first official recording of hadith. His days were not long; he was poisoned, it was said, and died at Dayr Simʿan near Homs in 101 AH at about forty. The Muslims wept for him and counted him among the Rightly-Guided.`,
    ],
    source: `al-Dhahabi, Siyar Aʿlam al-Nubalaʾ · Ibn ʿAbd al-Hakam, Sirat ʿUmar ibn ʿAbd al-ʿAziz`,
    disputed: `The well-known view is that he died on 20 Rajab 101 AH; some say the 25th.`,
  },
  'nawawi-death': {
    year: `676 AH`,
    title: `The death of Imam al-Nawawi`,
    summary: `Imam Yahya ibn Sharaf al-Nawawi died in his village of Nawa in the Hawran at forty-five years of age, leaving behind books that became mainstays of the Ummah: Riyad al-Salihin, the Forty Hadith, the commentary on Sahih Muslim, and al-Majmuʿ.`,
    story: [
      `al-Nawawi came to Damascus as a youth and settled at the Rawahiyya school, devoted to knowledge. He would study twelve lessons a day with his teachers and let no moment of night or day be wasted, until he surpassed his peers in jurisprudence, hadith and language.`,
      `He combined knowledge with asceticism and scrupulousness; he accepted nothing from anyone, his clothing was coarse and his food scant, and he spoke the truth openly even before Sultan al-Zahir Baybars himself, in famous letters defending the people against taxes and confiscations.`,
      `In his short life he wrote what long-lived men could not: "Riyad al-Salihin," "al-Adhkar," "al-Arbaʿin," "Minhaj al-Talibin," "al-Minhaj" (commentary on Sahih Muslim) and "al-Majmuʿ." He returned late in life to Nawa and died there on 24 Rajab 676 AH; his books remain in every house of learning to this day.`,
    ],
    source: `al-Dhahabi, Siyar Aʿlam al-Nubalaʾ · al-Sakhawi, biography of al-Nawawi`,
  },
  'imam-muslim-death': {
    year: `261 AH`,
    title: `The death of Imam Muslim ibn al-Hajjaj`,
    summary: `Imam Muslim ibn al-Hajjaj al-Qushayri — author of "al-Sahih," the second most authentic book after Sahih al-Bukhari, which he selected from three hundred thousand heard hadiths and arranged in a masterful order — died in Nishapur.`,
    story: [
      `Muslim was born in Nishapur around 204 AH and travelled for hadith to the Hijaz, Iraq, Syria and Egypt. He kept close to Imam al-Bukhari when he came to Nishapur and said to him: "Let me kiss your feet, O teacher of teachers and master of hadith scholars."`,
      `He compiled "al-Musnad al-Sahih" over fifteen years, gathering it from three hundred thousand hadiths, distinguished by collecting the chains of a hadith in one place and by fine arrangement, until some of the scholars of the Maghrib said: Beneath the vault of the sky there is nothing more authentic than the book of Muslim.`,
      `It was said of the cause of his death that he was asked about a hadith he did not recognize, so he spent his night searching his books with a basket of dates before him, eating one date at a time, until by morning he had found the hadith and finished the basket. He fell ill from it and died on 25 Rajab 261 AH, buried in Nishapur.`,
    ],
    source: `al-Dhahabi, Siyar Aʿlam al-Nubalaʾ · Ibn Khallikan, Wafayat al-Aʿyan`,
  },
  'isra-miraj': {
    year: `Before the Hijra`,
    title: `The Night Journey and the Ascension (al-Israʾ wa'l-Miʿraj)`,
    summary: `Allah took His Prophet ﷺ by night from the Sacred Mosque to the Farthest Mosque, then raised him through the high heavens to the Lote-Tree of the Utmost Boundary, and the five daily prayers were ordained — the greatest miracle after the Qur'an.`,
    story: [
      `The blessed journey came after the harshest years of the mission — the deaths of Abu Talib and Khadija and the rejection of the people of al-Taʾif — as a consolation from Allah to His Prophet ﷺ and a manifestation of his rank. Allah said: "Glory to Him who took His servant by night from the Sacred Mosque to the Farthest Mosque."`,
      `He was mounted on al-Buraq and reached Jerusalem, where he ﷺ led the prophets in prayer. Then he was raised heaven by heaven, meeting Adam, Yahya, ʿIsa, Yusuf, Idris, Harun, Musa and Ibrahim, until he reached the Lote-Tree of the Utmost Boundary, and fifty prayers were ordained upon him, then lightened to five with the reward of fifty.`,
      `When he told Quraysh, they denied him and asked him to describe Jerusalem, so Allah showed it to him until he described it. Abu Bakr affirmed him without hesitation, and so was named "al-Siddiq." The account remains a witness to the standing of the Farthest Mosque in the creed of the Muslims.`,
    ],
    source: `Sahih al-Bukhari and Sahih Muslim (the hadiths of al-Israʾ wa'l-Miʿraj)`,
    disputed: `No authentic hadith fixes the night of the Israʾ; it is popularly held to be 27 Rajab, while others say Rabiʿ al-Awwal, Ramadan or Shawwal. al-Hafiz Ibn Hajar and others stated that nothing is soundly established about fixing it.`,
  },
  'jerusalem-liberation': {
    year: `583 AH`,
    title: `Salah al-Din's recovery of Jerusalem`,
    summary: `Salah al-Din al-Ayyubi entered Jerusalem by peaceful surrender after a short siege, restoring al-Aqsa as a mosque after ninety-one years of Crusader occupation, and set the example in clemency by granting safety to its people without vengeance.`,
    story: [
      `After Hattin the coastal cities fell to Salah al-Din, then he besieged Jerusalem, in which tens of thousands of Crusaders had massed. When it was on the verge of falling, its people sought safety, so he made peace with them for a light ransom and freed thousands who could not pay it.`,
      `He entered it on Friday 27 Rajab 583 AH — on the anniversary of the night of the Israʾ by the well-known view — so the cross was removed from the Dome of the Rock, al-Aqsa Mosque was purified and washed with rosewater, and the Jumuʿa prayer was held in it after an interruption of ninety-four years.`,
      `Historians East and West compared his merciful entry with the Crusader massacre of 492 AH, when horses waded in blood. Salah al-Din's clemency was among the brightest pages of history, and the pulpit of Nur al-Din Zangi was carried to al-Aqsa, fulfilling a dream begun decades earlier.`,
    ],
    source: `Ibn Shaddad, al-Nawadir al-Sultaniyya · Ibn al-Athir, al-Kamil fi'l-Tarikh`,
  },
  'ottoman-caliphate-abolished': {
    year: `1342 AH`,
    title: `The abolition of the Ottoman Caliphate`,
    summary: `The Turkish National Assembly, led by Mustafa Kemal, issued the decision to abolish the caliphate and exile the last caliph, ʿAbd al-Majid II. With it fell the last unifying symbol of the Muslims after some thirteen centuries of the caliphate.`,
    story: [
      `The Ottoman Caliphate had weakened for centuries, until the state was defeated in the First World War and Istanbul was occupied. The caliphate was then stripped of the sultanate in 1922, and ʿAbd al-Majid II remained a nominal caliph without rule.`,
      `On 28 Rajab 1342 AH (3 March 1924) the Grand National Assembly in Ankara voted to abolish the office of the caliphate definitively and expel the House of Osman from Turkey, so ʿAbd al-Majid II left for Switzerland on the next morning's train.`,
      `The Muslim world was shaken by the news; caliphate congresses were held in Cairo and Makkah to no avail, and the event remained a turning point in modern history, after which the Ummah split into nation-states — many researchers date from it the beginning of an entirely new age.`,
    ],
    source: `Documents and sources of modern history (the decision of the Turkish National Assembly, 3 March 1924)`,
    disputed: `The decision was issued on 3 March 1924, which, according to calendar differences, corresponds to 27 or 28 Rajab 1342 AH — the 28th of Rajab being the more common in references.`,
  },
  // ————————————————— Shaʿban —————————————————
  'hussein-birth': {
    year: `4 AH`,
    title: `The birth of al-Husayn ibn ʿAli (may Allah be pleased with them both)`,
    summary: `al-Husayn ibn ʿAli ibn Abi Talib — grandson and beloved fragrance of the Messenger of Allah ﷺ and master of the youth of Paradise — was born in Madinah. The Prophet ﷺ performed the ʿaqiqa for him and named him al-Husayn, and he resembled the Prophet more than any other from his chest to his feet.`,
    story: [
      `al-Husayn was born to Fatima, daughter of the Messenger of Allah ﷺ, and ʿAli ibn Abi Talib in Shaʿban of the fourth year of the Hijra, about a year after his brother al-Hasan. The Prophet ﷺ gave the call to prayer in his ear, performed the ʿaqiqa for him and named him Husayn — a name the Arabs had not known before.`,
      `Many authentic hadiths affirm his virtue and his brother's, among them his ﷺ words: "al-Hasan and al-Husayn are the masters of the youth of Paradise," and "Husayn is of me and I am of Husayn; Allah loves whoever loves Husayn." He ﷺ would carry them on his back and prolong his prostration when they climbed upon him.`,
      `al-Husayn grew up in the house of prophethood upon knowledge, worship and courage, and would perform Hajj on foot many times, until Allah sealed his life with martyrdom at Karbala in 61 AH — so he combined the honour of lineage and the honour of martyrdom, may Allah be pleased with him.`,
    ],
    source: `Ibn Hajar, al-Isaba fi Tamyiz al-Sahaba · al-Dhahabi, Siyar Aʿlam al-Nubalaʾ`,
    disputed: `The well-known view is that he was born in Shaʿban 4 AH; some say the 3rd of Shaʿban, some the 5th, and some in the year 3 AH.`,
  },
  'ramadan-fasting-ordained': {
    year: `2 AH`,
    title: `The ordaining of the fast of Ramadan`,
    summary: `The obligation of fasting Ramadan was revealed in Shaʿban of the second year of the Hijra, in Allah's words: "So whoever among you witnesses the month, let him fast it." The Prophet ﷺ fasted nine Ramadans, and fasting became the fourth pillar of Islam.`,
    story: [
      `The legislation of fasting came through a wise gradation: the Prophet ﷺ fasted ʿAshura and ordered its fasting; then came the choice between fasting and a ransom — "And upon those who are able, a ransom of feeding a poor person"; then came the firm command: "So whoever among you witnesses the month, let him fast it."`,
      `That was in Shaʿban 2 AH, about a month before the Battle of Badr, so the first Ramadan the Muslims fasted was that of the second year, in the seventeenth of which the Great Battle of Badr took place — they joined fasting and jihad.`,
      `The Prophet ﷺ fasted nine Ramadans until he met his Lord, and taught his Ummah that fasting is a shield, and that "the month of Ramadan, in which the Qur'an was sent down as guidance for the people," is the opportunity of a lifetime for freedom from the Fire. So Ramadan became the most beloved of months to the Muslims until the Hour comes.`,
    ],
    source: `Ibn Kathir, Tafsir al-Qur'an al-ʿAzim and al-Bidaya wa'l-Nihaya`,
    disputed: `The obligation was revealed in Shaʿban 2 AH by the agreement of the biographers, without fixing its day.`,
  },
  'alarcos': {
    year: `591 AH`,
    title: `The Battle of Alarcos`,
    summary: `The Almohad caliph Yaʿqub al-Mansur crushingly defeated Alfonso VIII, king of Castile, at the fortress of Alarcos south of Toledo — a victory historians counted as the last of the great Islamic triumphs in al-Andalus.`,
    story: [
      `Alfonso VIII exploited the Almohads' preoccupation with Africa and raided the Muslims' lands as far as the outskirts of Seville, sending al-Mansur a famous letter of challenge. So al-Mansur crossed the sea with vast armies from the Maghrib.`,
      `The two hosts met at the fortress of Alarcos on 9 Shaʿban 591 AH (July 1195). al-Mansur ordered a precise plan: repel the Castilian vanguard, then close upon it with the centre and the two wings. The Castilian army was shattered, and Alfonso himself barely escaped.`,
      `The fortress fell, the Muslims gained incalculable spoils, and al-Mansur freed thousands of captives without ransom. The Muslims recovered many strongholds, and the victory of Alarcos — before the catastrophe of Las Navas de Tolosa two decades later — remained the last of the great days of Islam's glory in al-Andalus.`,
    ],
    source: `ʿAbd al-Wahid al-Marrakushi, al-Muʿjib · Ibn al-Athir, al-Kamil fi'l-Tarikh`,
  },
  'qibla-change': {
    year: `2 AH`,
    title: `The change of the Qibla to the Sacred Mosque`,
    summary: `After sixteen months of praying toward Jerusalem, Allah's command came to turn the Qibla to the noble Kaʿba in answer to the Prophet's ﷺ longing: "So turn your face toward the Sacred Mosque." Thus the Ummah was distinguished by its own Qibla.`,
    story: [
      `In Makkah the Prophet ﷺ prayed toward Jerusalem with the Kaʿba before him. After the Hijra he prayed toward Jerusalem for sixteen months, longing to be turned to the Kaʿba, the Qibla of his father Ibrahim, and turning his face toward the sky in hope and expectation.`,
      `Then the verses were revealed: "We have certainly seen the turning of your face toward the sky, so We will surely turn you to a Qibla with which you will be pleased. So turn your face toward the Sacred Mosque." He ﷺ turned in the prayer, and a man came to people praying ʿAsr — in a report, to the people of Qubaʾ at Fajr — and said: I bear witness that I prayed with the Messenger of Allah toward Makkah, so they turned, as they were, toward the Kaʿba.`,
      `The Jews and hypocrites raised an outcry: What turned them from their former Qibla? So Allah revealed: "Say: To Allah belong the East and the West." The mosque in which the change occurred was named the Mosque of the Two Qiblas, and the Kaʿba became the unifying Qibla of the Muslims forever.`,
    ],
    source: `Sahih al-Bukhari · Ibn Kathir, Tafsir of Surat al-Baqara`,
    disputed: `The well-known view is that the change was in mid-Shaʿban 2 AH, two months before Badr; some say in Rajab. The difference is old among the biographers.`,
  },
  'kosovo-battle': {
    year: `791 AH`,
    title: `The Battle of Kosovo and the martyrdom of Sultan Murad I`,
    summary: `The Ottomans broke the Balkan Crusader alliance led by the Serb prince Lazar on the plain of Kosovo. Sultan Murad I was martyred on the battlefield, and the victory anchored the Ottomans in the Balkans for centuries.`,
    story: [
      `The Serb prince Lazar assembled an alliance of Serbs, Bosnians and others to drive the Ottomans out of Europe, so Sultan Murad I crossed with his army, and the two hosts met on the plain of Kosovo ("Kosovo Polje") on 15 Shaʿban 791 AH (June 1389).`,
      `A ferocious battle raged in which the alliance was broken and Lazar was killed. While Sultan Murad was surveying the battlefield, a wounded Serb stabbed him a fatal blow — the first Ottoman sultan to be martyred on the field.`,
      `His son Bayezid "the Thunderbolt" assumed rule immediately upon his martyrdom and completed the victory. The battle opened the Balkans to the Ottoman state for five centuries, and Kosovo has remained a Muslim-majority land from that day to ours.`,
    ],
    source: `Sources of Ottoman and Balkan history`,
    disputed: `It occurred on 15 June 1389, corresponding in conversion to 15 Shaʿban 791 AH according to the well-known view, with slight differences in some references.`,
  },
  'jerusalem-crusader-fall': {
    year: `492 AH`,
    title: `The fall of Jerusalem to the Crusaders`,
    summary: `The First Crusade stormed Jerusalem after a siege of five weeks and committed a terrible massacre in which tens of thousands were killed at al-Aqsa Mosque and throughout the city. It remained in their hands for ninety-one years.`,
    story: [
      `The hosts of the First Crusade reached the walls of Jerusalem in 492 AH while the Muslims were at the height of their disunity — the Seljuks quarreling and the Fatimids having seized the city a year earlier — so the city found no defender.`,
      `On 23 Shaʿban 492 AH (15 July 1099) the Crusaders stormed the walls from the north and committed a massacre described by their own historians before the Muslims': those seeking refuge in al-Aqsa were killed and the Jews were burned in their synagogue, until one of their witnesses said: the horses waded in blood up to the knees.`,
      `The news shook the Muslim world, and the judge Abu Saʿd al-Harawi stood crying out in the caliphal court in Baghdad: "Does it become you to sleep in the shade of safety while your brothers in Syria have no shelter but the backs of camels and the bellies of vultures?" The cry was a seed of long jihad that bore fruit a century later at the hands of Nur al-Din and Salah al-Din.`,
    ],
    source: `Ibn al-Athir, al-Kamil fi'l-Tarikh · Sources of the First Crusade`,
    disputed: `The city fell on 15 July 1099, corresponding to 22 or 23 Shaʿban 492 AH according to differences in calendar calculation.`,
  },
  'ibn-kathir-death': {
    year: `774 AH`,
    title: `The death of al-Hafiz Ibn Kathir`,
    summary: `The hafiz ʿImad al-Din Ismaʿil ibn Kathir — author of "Tafsir al-Qur'an al-ʿAzim" and "al-Bidaya wa'l-Nihaya," student of Ibn Taymiyya and al-Mizzi, and one of the pillars of tafsir and history in the Ummah's heritage — died in Damascus.`,
    story: [
      `Ibn Kathir was born in a village of the district of Busra al-Sham around 701 AH and moved as a child to Damascus, where he attached himself to its senior scholars, married the daughter of the hafiz al-Mizzi, was influenced by his teacher Ibn Taymiyya and supported him in some of his trials.`,
      `He wrote his famous tafsir, reckoned the most authentic and famous of the tafsirs by transmission, explaining the Qur'an by the Qur'an, then the Sunnah, then the sayings of the early generations. His "al-Bidaya wa'l-Nihaya" is an encyclopaedia of Islamic history from the beginning of creation to his own age, and he summarized the sciences of hadith in "Ikhtisar ʿUlum al-Hadith."`,
      `His sight failed late in life from much writing by night, and he said: "I remained at it — meaning the compilation of al-Tahdhib — until my sight went." He died in Damascus in Shaʿban 774 AH and was buried, by his own bequest, beside his teacher Ibn Taymiyya in the cemetery of the Sufis.`,
    ],
    source: `Ibn Hajar, al-Durar al-Kamina · Ibn al-ʿImad, Shadharat al-Dhahab`,
    disputed: `He died in Shaʿban 774 AH by the agreement of his biographers; the 26th of it is mentioned in some sources without certainty.`,
  },
  // ————————————————— Ramadan —————————————————
  'shaqhab': {
    year: `702 AH`,
    title: `The Battle of Shaqhab (Marj al-Suffar)`,
    summary: `The Muslims, led by the Mamluks and the scholars of Syria — foremost among them Ibn Taymiyya — repelled the last Mongol invasion from Damascus at the decisive Battle of Shaqhab. The troops were fasting, so Ibn Taymiyya gave them a ruling to break their fast to gain strength for battle.`,
    story: [
      `The Mongols advanced under Qutlushah upon Syria in 702 AH after defeating the Muslims at Wadi al-Khazindar three years earlier. The people panicked and were about to flee, so Shaykh al-Islam Ibn Taymiyya rose to steady the emirs and the commoners, swearing: In this encounter you shall be victorious.`,
      `He went himself to Egypt to urge on Sultan al-Nasir Muhammad; the Egyptian troops came, and the two hosts met at Marj al-Suffar near Shaqhab south of Damascus on 2 Ramadan 702 AH. Ibn Taymiyya gave the soldiers a ruling to break their fast and broke his own before them so they would take the dispensation and gain strength.`,
      `A tremendous battle raged for three days and ended in a crushing defeat of the Mongols, after which they never rose again in Syria. The victors entered Damascus in a memorable celebration, and Shaqhab was counted among the decisive days of Islam.`,
    ],
    source: `Ibn Kathir, al-Bidaya wa'l-Nihaya (the events of the year 702 AH)`,
  },
  'azhar-first-prayer': {
    year: `361 AH`,
    title: `The inauguration of al-Azhar Mosque`,
    summary: `The first Friday prayer was held in al-Azhar Mosque, built by Jawhar al-Siqilli in the Cairo of al-Muʿizz, which would become over the centuries the most famous beacon of learning in the Muslim world and the oldest of its functioning universities.`,
    story: [
      `When Jawhar al-Siqilli laid out Cairo for al-Muʿizz li-Din Allah al-Fatimi in 358 AH, he began building its great mosque. It was completed after about two years, and the first Friday prayer was held in it in Ramadan 361 AH (972 CE).`,
      `It was said to be named al-Azhar in honour of Lady Fatima al-Zahraʾ (may Allah be pleased with her). It soon turned from a congregational mosque into a house of teaching in which circles of jurisprudence and language were held, and successive dynasties turned it — under the Ayyubids and Mamluks — into a citadel of the sciences of Ahl al-Sunnah.`,
      `For a thousand years al-Azhar has received students of knowledge from the ends of the earth in its arcades, known by the names of their homelands, carrying the banner of the Arabic language and the religious sciences in the face of invasions and colonialism, and it is today the oldest functioning university in the Muslim world.`,
    ],
    source: `al-Maqrizi, al-Mawaʿiz wa'l-Iʿtibar (al-Khitat) · Ibn Taghribirdi, al-Nujum al-Zahira`,
    disputed: `al-Maqrizi dated the first Friday prayer in it to Ramadan 361 AH; some mention 7 Ramadan, and the daily dating is conjectural.`,
  },
  'khadija-death': {
    year: `10 of the Prophethood`,
    title: `The death of the Mother of the Believers Khadija (may Allah be pleased with her)`,
    summary: `The Mother of the Believers Khadija bint Khuwaylid — the first to believe in the Messenger of Allah ﷺ and the first to console him with herself and her wealth — died in Makkah, in the year named "the Year of Grief" for his sorrow over her and Abu Talib.`,
    story: [
      `Khadija (may Allah be pleased with her) was the noblest of the women of Quraysh in honour and wealth. The Prophet ﷺ married her fifteen years before the mission, and when revelation came to him at the Cave of Hiraʾ he returned to her with a trembling heart, and she spoke her immortal words: "No, by Allah, Allah will never disgrace you; you keep ties of kinship, bear the burden of the weak, host the guest and help against the calamities of truth."`,
      `She believed in him before all people and consoled him with her wealth and herself through the years of the boycott and persecution. She bore all his children except Ibrahim, and he did not marry another while she lived, and he kept remembering her after her death until ʿAʾisha said: I was never jealous of anyone as I was of Khadija.`,
      `She died in Ramadan of the tenth year of the mission, about three years before the Hijra, and was buried at al-Hajun in Makkah. Her Lord had given her glad tidings of a house in Paradise of hollowed pearl, with no clamour or toil in it, and he ﷺ said: "The best of its women is Maryam, and the best of its women is Khadija."`,
    ],
    source: `Sahih al-Bukhari (the virtues of Khadija) · Ibn Saʿd, al-Tabaqat al-Kubra`,
    disputed: `The well-known view is that she died in Ramadan of the tenth year of the mission; some mention the tenth day of it without certainty.`,
  },
  'ramadan-war-1973': {
    year: `1393 AH`,
    title: `The War of the Tenth of Ramadan (October 1973)`,
    summary: `Egyptian forces crossed the Suez Canal and stormed the Bar Lev Line while Syrian forces attacked the Golan, in a simultaneous offensive that restored the Ummah's confidence after the setback of 1967. The crossing remains a symbol of resolve.`,
    story: [
      `At two in the afternoon on Saturday 10 Ramadan 1393 AH (6 October 1973), the largest water-crossing operation in modern history began: the Egyptian waves crossed the canal under the cover of the fire of thousands of guns, and water hoses breached the earthen ramparts of the Bar Lev Line, opening the gaps.`,
      `The cry of "Allahu Akbar" was raised as the war-slogan, and the fortresses of Bar Lev — said to be impregnable — fell within hours. On the Golan the Syrian forces stormed the fortified positions and recovered parts of the plateau in the first days.`,
      `Regardless of the military and political outcomes after the breach and the ceasefire, the day of the crossing — deliberately chosen in the month of fasting — remained a lesson that Ramadan is a month of struggle and effort, in which the Ummah recalls Badr, ʿAyn Jalut and Hattin.`,
    ],
    source: `Contemporary military sources and documents of the October 1973 War`,
  },
  'badr': {
    year: `2 AH`,
    title: `The Great Battle of Badr — the Day of Distinction`,
    summary: `Three hundred and some ten Muslims met around a thousand of Quraysh at the well of Badr. Allah granted them a mighty victory aided by the angels; the chiefs of polytheism were slain, and Allah named it the Day of Distinction (Yawm al-Furqan).`,
    story: [
      `The Prophet ﷺ set out to intercept the caravan of Abu Sufyan, but it escaped. Quraysh marched out arrogantly, about a thousand strong, to protect their trade, then refused all but battle. He ﷺ consulted his Companions, and al-Miqdad said: We will not say to you as the Children of Israel said to Musa; and Saʿd ibn Muʿadh spoke his famous words for the Ansar.`,
      `He ﷺ spent his night praying and imploring his Lord: "O Allah, if this band perishes, You will not be worshipped on earth." So Allah sent down His angels: "I will reinforce you with a thousand angels in succession." The battle took place on Friday 17 Ramadan, and the polytheists were routed.`,
      `Seventy of Quraysh were killed, among them Abu Jahl, Umayya ibn Khalaf, ʿUtba and Shayba, and seventy were captured, while fourteen Muslims were martyred. "The People of Badr" became the highest of the Companions in rank, and Allah said of the day: "And in what We sent down to Our servant on the Day of Distinction, the day the two hosts met."`,
    ],
    source: `Sahih al-Bukhari and Muslim · Ibn Hisham, al-Sira al-Nabawiyya`,
  },
  'aisha-death': {
    year: `58 AH`,
    title: `The death of the Mother of the Believers ʿAʾisha (may Allah be pleased with her)`,
    summary: `The Mother of the Believers ʿAʾisha bint Abi Bakr al-Siddiq — the most beloved of the Prophet's ﷺ wives to him and the most learned woman of the Ummah, who carried, it was said, a quarter of the religion — died in Madinah and was buried in al-Baqiʿ by night, as she had willed.`,
    story: [
      `ʿAʾisha (may Allah be pleased with her) was the most knowledgeable of people in the Sunnah of the Messenger of Allah ﷺ; she narrated from him more than two thousand hadiths. When a matter perplexed the senior Companions they would ask her and find knowledge of it with her. Abu Musa said: Never did a hadith perplex us and we asked ʿAʾisha but that we found knowledge of it with her.`,
      `Concerning her, her innocence was revealed from above seven heavens in verses recited from Surat al-Nur after the incident of the slander, and the Prophet ﷺ died in her house, on her day, between her chest and neck, and was buried in her chamber.`,
      `She lived about forty-eight years after him, teaching the Ummah, and died in Ramadan 58 AH at about sixty-six. She willed that she be buried in al-Baqiʿ with her companions by night; Abu Hurayra prayed over her, and the people thronged at her funeral, may Allah be pleased with her.`,
    ],
    source: `al-Dhahabi, Siyar Aʿlam al-Nubalaʾ · Ibn Saʿd, al-Tabaqat al-Kubra`,
    disputed: `The well-known view is that she died on the night of 17 Ramadan 58 AH; some say the year 57 AH.`,
  },
  'makkah-conquest': {
    year: `8 AH`,
    title: `The Conquest of Makkah`,
    summary: `The Prophet ﷺ entered Makkah with ten thousand of his Companions, his head bowed in humility to Allah. He smashed the idols around the Kaʿba while reciting "Truth has come and falsehood has vanished," and pardoned its people with his words: "Go, for you are free."`,
    story: [
      `When Quraysh broke the Treaty of Hudaybiyya by their allies Banu Bakr's aggression against Khuzaʿa, the Prophet ﷺ prepared in complete secrecy and marched with ten thousand, so that Quraysh were taken by surprise as the armies surrounded Makkah. He ﷺ proclaimed: "Whoever enters the house of Abu Sufyan is safe, whoever shuts his door is safe, and whoever enters the Mosque is safe."`,
      `He ﷺ entered Makkah from its heights in humility, so that his chin nearly touched his saddle in gratitude to Allah, and no fighting worth mention took place save a slight skirmish on Khalid's side. He went to the Kaʿba, around which were three hundred and sixty idols, and began striking them with his bow, saying: "Truth has come and falsehood has vanished; indeed falsehood is bound to vanish."`,
      `Then he said to Quraysh, whose hearts were filled with fear: "What do you think I will do with you?" They said: A noble brother and the son of a noble brother. He said: "Go, for you are free." It was the Greatest Conquest, after which people entered the religion of Allah in throngs, and Bilal climbed atop the Kaʿba to give the call to prayer, heralding a new age.`,
    ],
    source: `Sahih al-Bukhari and Muslim · Ibn Hisham, al-Sira al-Nabawiyya`,
    disputed: `He ﷺ entered Makkah with ten nights remaining of Ramadan 8 AH according to the well-known view; the reports range between the 19th and the 21st of it.`,
  },
  'ali-martyrdom': {
    year: `40 AH`,
    title: `The martyrdom of ʿAli ibn Abi Talib (may Allah be pleased with him)`,
    summary: `The Kharijite ʿAbd al-Rahman ibn Muljam struck the Commander of the Faithful ʿAli ibn Abi Talib with a poisoned sword as he went out for the Fajr prayer in Kufa. He died two days later, folding the page on the fourth of the Rightly-Guided Caliphs.`,
    story: [
      `Three of the Khawarij conspired to kill ʿAli, Muʿawiya and ʿAmr ibn al-ʿAs on a single night, claiming they would thereby relieve the Ummah. The assassins of Muʿawiya and ʿAmr failed, while Ibn Muljam lay in wait for ʿAli in the mosque of Kufa.`,
      `At dawn on 19 Ramadan 40 AH, ʿAli went out rousing the people for prayer, calling: Prayer, prayer! Ibn Muljam struck him on the crown of his head with a poisoned sword, crying the Kharijite slogan: There is no rule but for Allah. ʿAli said: I have succeeded, by the Lord of the Kaʿba.`,
      `He lingered two days, counselling fear of Allah, adherence to the community, and good treatment of his killer — pardon if they forgave, or retaliation in kind without mutilation. He died on the night of 21 Ramadan at sixty-three; his two sons washed him, prayed over him and buried him in Kufa, and after him his son al-Hasan was given the pledge.`,
    ],
    source: `al-Tabari, Tarikh al-Rusul wa'l-Muluk · al-Dhahabi, Siyar Aʿlam al-Nubalaʾ`,
    disputed: `He was struck at dawn on 19 Ramadan and died on the night of the 21st of it in 40 AH by the well-known view; some reports say 17 Ramadan.`,
  },
  'ayn-jalut': {
    year: `658 AH`,
    title: `The Battle of ʿAyn Jalut`,
    summary: `The Muslims under Sultan Qutuz and Baybars shattered the legend of the "unbeatable" Mongols at ʿAyn Jalut in Palestine, saving Egypt and the Muslim world and beginning the expulsion of the Mongols from all of Syria.`,
    story: [
      `After the fall of Baghdad, Aleppo and Damascus, Hulagu sent envoys to Egypt with a fearsome letter of threat. Qutuz gathered the emirs, resolved on confrontation and had the envoys killed, and spoke his words: "I will meet the Tatars myself," and went out with the army from Egypt despite the smallness of its numbers and equipment.`,
      `The two hosts met at ʿAyn Jalut near Baysan on Friday 25 Ramadan 658 AH (September 1260). Baybars lured Kitbugha's army with the vanguard into an ambush, and when the pressure grew, Qutuz cast off his helmet and cried his ringing cry: O Islam! and charged himself.`,
      `Kitbugha was killed and the Mongol army annihilated — the first confirmed great defeat of the Mongols since Genghis Khan — and Syria was liberated within weeks. By this battle Allah preserved Egypt, the two Holy Sanctuaries and the Maghrib beyond them, so it was counted among the most decisive battles in human history.`,
    ],
    source: `al-Maqrizi, al-Suluk · Ibn Kathir, al-Bidaya wa'l-Nihaya`,
  },
  'guadalete': {
    year: `92 AH`,
    title: `The Battle of Guadalete and the Conquest of al-Andalus`,
    summary: `Tariq ibn Ziyad, with twelve thousand men, defeated the Visigothic army of King Roderic at the decisive Battle of Guadalete, opening the gates of al-Andalus, which would become a beacon of Islamic civilization in Europe for eight centuries.`,
    story: [
      `Tariq ibn Ziyad crossed the strait that would later bear his name in Rajab 92 AH by leave of Musa ibn Nusayr and landed at the mountain named after him (Jabal Tariq). When word reached him of Roderic advancing with hosts approaching a hundred and forty thousand, he sought reinforcement from Musa, who reinforced him.`,
      `The two hosts met on the banks of Wadi Lakka (Guadalete) in the south of al-Andalus for eight days. The wings of Roderic's rivals abandoned their king, the Muslims held firm until the Visigothic army collapsed, and Roderic drowned or was killed in the battle on 28 Ramadan 92 AH (July 711).`,
      `After it the cities fell one by one: Cordoba, then the capital Toledo; then Musa ibn Nusayr completed the conquest. In al-Andalus arose a civilization of eight centuries that lit up Europe with knowledge and building, from Cordoba and al-Zahraʾ to Granada and the Alhambra.`,
    ],
    source: `Ibn ʿIdhari, al-Bayan al-Mughrib · al-Maqqari, Nafh al-Tib`,
    disputed: `The well-known view is that the decisive battle was on 28 Ramadan 92 AH after some days of fighting; some sources differ slightly over the numbers and the days.`,
  },
  'quran-first-revelation': {
    year: `Before the Hijra`,
    title: `The beginning of the revelation of the Qur'an — the Night of Decree`,
    summary: `On a blessed night of Ramadan, Jibril descended upon the Prophet ﷺ in the Cave of Hiraʾ with the first of the Qur'an: "Read in the name of your Lord who created." It was the night that changed the face of history — the Night of Decree, better than a thousand months.`,
    story: [
      `The Prophet ﷺ used to seclude himself in the Cave of Hiraʾ for many nights in worship, until the truth came upon him there: the angel came and said, "Read." He said, "I am not one who reads." The angel pressed him until he could bear no more, then released him: "Read in the name of your Lord who created," and he ﷺ returned with a trembling heart.`,
      `The Qur'an itself states the time of the revelation: "The month of Ramadan in which the Qur'an was sent down," "Indeed We sent it down on the Night of Decree." So the beginning of revelation was in Ramadan on the Night of Decree, and the Qur'an continued to descend for twenty-three years according to events.`,
      `Allah concealed the exact night that it might be sought in the last ten nights and their odd ones. He ﷺ said: "Seek the Night of Decree in the odd nights of the last ten of Ramadan." Whoever stands it in faith and hope of reward is forgiven his past sins, and it is better than a thousand months.`,
    ],
    source: `Sahih al-Bukhari (the beginning of revelation) · Surat al-ʿAlaq and Surat al-Qadr`,
    disputed: `Its being in Ramadan is definitive by the text of the Qur'an; fixing the Night of Decree, however, is concealed. The strongest view is that it moves among the odd nights of the last ten, and 27 is widely held among many without certainty.`,
  },
  // ————————————————— Shawwal —————————————————
  'first-eid-fitr': {
    year: `2 AH`,
    title: `The first Eid al-Fitr in Islam`,
    summary: `The Prophet ﷺ led the Muslims in the first Eid al-Fitr prayer in the history of Islam, following the first obligatory Ramadan. They had just returned victorious from Badr, so the joy of victory joined the joy of completing the fast.`,
    story: [
      `When the Prophet ﷺ came to Madinah he found its people with two days of play from the days of Jahiliyya, so he said: "Allah has replaced them for you with two better days: the day of al-Adha and the day of al-Fitr." When Ramadan was made obligatory in the second year, the first Eid came after it.`,
      `It was an Eid the like of which Madinah had not known: it was preceded by the ordaining of fasting, and Zakat al-Fitr was made obligatory in it as a purification for the fasting person and a provision for the poor, and it was preceded by the great victory of Badr. So the Prophet ﷺ went out with the Muslims to the prayer-ground, led them in two rakʿas and then addressed them.`,
      `His Sunnah for the Eid took shape: bathing and adorning oneself, eating dates before going out, saying the takbir aloud, taking a different route, and bringing out the women and children to the prayer-ground — a lawful joy combining worship, kinship and delight.`,
    ],
    source: `Sunan Abi Dawud (the hadith of the two days of play) · Ibn Kathir, al-Bidaya wa'l-Nihaya`,
  },
  'bukhari-death': {
    year: `256 AH`,
    title: `The death of Imam al-Bukhari`,
    summary: `The Commander of the Faithful in hadith, Muhammad ibn Ismaʿil al-Bukhari — author of "al-Jamiʿ al-Sahih," the most authentic book after the Book of Allah — died on the night of Eid al-Fitr at Khartank near Samarqand, a stranger far from his hometown of Bukhara.`,
    story: [
      `al-Bukhari memorized hadith as a child and travelled to over a thousand shaykhs across the lands. He compiled his Sahih from six hundred thousand hadiths over sixteen years, placing no hadith in it until he had bathed and prayed two rakʿas. The Ummah received it with acceptance, and it became the most authentic book after the Qur'an.`,
      `He was tested at the end of his life: he was driven out of Nishapur because of the "utterance" controversy, then the emir of Bukhara asked him to give private instruction to him and his sons in his house. al-Bukhari refused to humiliate knowledge or carry it to the doors of rulers, so he was expelled from his town and prayed to Allah to take him.`,
      `He went to Khartank, where his relatives were, fell ill and died on the night of Saturday, the night of Eid al-Fitr, in 256 AH at sixty-two years less some days, and was buried there after the Zuhr prayer on Eid day. His grave remains a place of visitation near Samarqand.`,
    ],
    source: `Ibn Hajar, Hadi al-Sari · al-Dhahabi, Siyar Aʿlam al-Nubalaʾ`,
  },
  'khandaq': {
    year: `5 AH`,
    title: `The Battle of the Trench (al-Ahzab)`,
    summary: `The confederate tribes of Arabs and Jews, ten thousand strong, encircled Madinah. The Muslims dug the trench on Salman al-Farisi's advice and held firm for a month in cold and hunger, until Allah turned back the disbelievers in their rage, having attained no good.`,
    story: [
      `A group of the Jews of Banu al-Nadir incited Quraysh, Ghatafan and their followers against Madinah, some ten thousand strong. Salman al-Farisi advised digging a trench before the city on its exposed side. The Prophet ﷺ worked in it with his own hands and the Companions with him in severe hunger, and he promised them, as they struck the rock, the treasures of Chosroes and Caesar.`,
      `The confederates were confounded by the trench, a stratagem the Arabs did not know, and the siege dragged on about a month. The trial grew severe with the treachery of Banu Qurayza from within: "and the hearts reached the throats," yet the believers held firm: "This is what Allah and His Messenger promised us."`,
      `Then Allah sent upon them a cold, violent wind and hosts they could not see, and Nuʿaym ibn Masʿud — who had secretly embraced Islam — split the word of the confederates, so they withdrew in failure. The Prophet ﷺ said: "Now we shall raid them and they will not raid us." So the Trench marked the turning point in the struggle with Quraysh.`,
    ],
    source: `Sahih al-Bukhari · Ibn Hisham, al-Sira al-Nabawiyya`,
    disputed: `The well-known view is that it was in Shawwal 5 AH; some say 4 AH. The siege extended into Dhu'l-Qaʿda, and its days are not definitively fixed.`,
  },
  'uhud': {
    year: `3 AH`,
    title: `The Battle of Uhud`,
    summary: `Quraysh marched out three thousand strong to avenge Badr, and the Muslims met them by Mount Uhud. Victory was theirs at first, until the archers disobeyed the Prophet's ﷺ order; the tide turned and seventy were martyred, among them Hamza, the Master of the Martyrs.`,
    story: [
      `Quraysh came with their followers driven by the vengeance of Badr, so the Prophet ﷺ went out with a thousand, a third of whom turned back with the head of hypocrisy, Ibn Ubayy. He stationed the fifty archers on the hill and ordered them not to leave whether the Muslims won or lost.`,
      `The polytheists were routed at the start of the day, but when the archers saw the spoils, most of them came down. Khalid ibn al-Walid — a polytheist that day — wheeled around from behind the hill, the ranks were thrown into disorder, the Prophet's ﷺ face was gashed and his tooth broken, and Satan cried: Muhammad is killed — it was a grievous hour.`,
      `Seventy were martyred, among them Hamza ibn ʿAbd al-Muttalib and Musʿab ibn ʿUmayr, the banner-bearer. He ﷺ held firm until he drew back to the mountain, and verses of Al ʿImran were revealed that day, admonishing and nurturing: "And Allah had certainly fulfilled His promise to you... and that Allah might purify those who believe." So Uhud was the Ummah's school in the cost of disobedience and the etiquette of trial.`,
    ],
    source: `Sahih al-Bukhari · Ibn Hisham, al-Sira al-Nabawiyya`,
    disputed: `The well-known view is Saturday 7 Shawwal 3 AH; some say the middle of Shawwal.`,
  },
  'hamra-alasad': {
    year: `3 AH`,
    title: `The Expedition of Hamraʾ al-Asad`,
    summary: `On the morning after the wounds of Uhud, the Prophet ﷺ called that none go out with him but those who had fought the day before. The wounded went out, straining after Quraysh, until they reached Hamraʾ al-Asad, and Allah cast terror into the hearts of their enemy.`,
    story: [
      `Word reached the Prophet ﷺ that Quraysh at al-Rawhaʾ were reproaching one another and considering a return to uproot Madinah, so he called the people to pursue the enemy, singling out those who had been at Uhud the day before. The Companions went out with their wounds, straining on, some of them even carried.`,
      `Concerning them was revealed: "Those who responded to Allah and the Messenger after injury had struck them — for those who did good among them and feared Allah is a great reward." Maʿbad al-Khuzaʿi passed by them and went to Abu Sufyan, exaggerating Muhammad's host to him, so Allah cast terror into their hearts and they departed for Makkah.`,
      `The Prophet ﷺ stayed at Hamraʾ al-Asad three days, kindling fires that the enemy might see them, then returned to Madinah having restored his army's awe in the morning of a single day after the wounds — an enduring lesson that yesterday's setback does not prevent today's rising.`,
    ],
    source: `Ibn Hisham, al-Sira al-Nabawiyya · Ibn Kathir, al-Bidaya wa'l-Nihaya`,
  },
  'hunayn': {
    year: `8 AH`,
    title: `The Battle of Hunayn`,
    summary: `After the conquest of Makkah, Hawazin and Thaqif massed their hosts in the valley of Hunayn. The Muslims were at first exposed when their numbers pleased them, then the Prophet ﷺ held firm with those who stood fast, until Allah returned the victory with mighty spoils.`,
    story: [
      `The Prophet ﷺ went out after the conquest with twelve thousand, and some said: We will not be defeated today for fewness! Hawazin lay in ambush in the defiles of the valley of Hunayn and loosed a single volley upon the Muslims in the dimness of dawn, so the ranks broke and the people turned back.`,
      `The Messenger of Allah ﷺ stood firm on his mule, saying: "I am the Prophet, no lie; I am the son of ʿAbd al-Muttalib," while al-ʿAbbas called out to the people of the Pledge of the Tree. The Muslims returned as if starting anew, and Allah sent down His tranquillity and hosts unseen: "And on the day of Hunayn, when your great numbers pleased you but availed you nothing."`,
      `Hawazin were routed and thousands of camels and sheep were taken as spoils, which he ﷺ apportioned among "those whose hearts were to be reconciled" from among the newly-Muslim of the conquest. Then the delegation of Hawazin came as Muslims, and he returned their captives to them. The lesson of Hunayn was distilled: victory is from Allah, not by numbers, and hearts are won by generosity.`,
    ],
    source: `Sahih Muslim · Ibn Hisham, al-Sira al-Nabawiyya`,
    disputed: `It was in Shawwal 8 AH, about two weeks after the conquest; the well-known view is around 10 Shawwal.`,
  },
  'nur-aldin-death': {
    year: `569 AH`,
    title: `The death of Sultan Nur al-Din Zangi`,
    summary: `The just king Nur al-Din Mahmud Zangi — unifier of Syria and Egypt, pioneer of the school that produced Salah al-Din, and who prepared the pulpit of Jerusalem years before its liberation in faith of the promise — died in Damascus.`,
    story: [
      `Nur al-Din inherited from his father ʿImad al-Din Zangi the banner of jihad against the Crusaders. He united Aleppo and Damascus, then sent his armies into Egypt until it was annexed to him, and removed the Fatimid state at the hands of his commander Salah al-Din — uniting the front for the first time in a century.`,
      `With his jihad he was just and ascetic: he built schools, houses of hadith and the famous Nuri hospital, gave the subjects justice through a court of grievances, and it was said that no ruler's conduct like his had been seen on the pulpits of Islam after the Rightly-Guided. He ordered a splendid pulpit made to be set up in al-Aqsa on the day it would be conquered.`,
      `He died in the citadel of Damascus on 11 Shawwal 569 AH before he could see the conquest of Jerusalem, so his student Salah al-Din carried the banner after him and set up his pulpit in al-Aqsa thirteen years later. Nur al-Din was the planter and Salah al-Din the harvester.`,
    ],
    source: `Ibn al-Athir, al-Kamil fi'l-Tarikh · Ibn Khallikan, Wafayat al-Aʿyan`,
  },
  'taif-siege': {
    year: `8 AH`,
    title: `The Siege of al-Taʾif`,
    summary: `The Prophet ﷺ besieged Thaqif in their impregnable fortress at al-Taʾif after Hunayn for about a month, then lifted the siege and prayed: "O Allah, guide Thaqif and bring them." Their delegation came as Muslims a year later, without fighting.`,
    story: [
      `The remnants of Hawazin and Thaqif took refuge after Hunayn in the impregnable fortress of al-Taʾif, which they had stocked with a year's provisions. The Prophet ﷺ besieged them and struck the fortress with the catapult (manjaniq) — the first use of it in Islam — and a number of Companions were struck by the fortress's missiles.`,
      `When the siege dragged on, he ﷺ consulted Nawfal ibn Muʿawiya al-Dili, who said: A fox in its den; if you stay upon it you will take it, and if you leave it, it will not harm you. So he ordered departure. The Companions said: Let us supplicate against Thaqif; he said: "O Allah, guide Thaqif and bring them."`,
      `Allah answered his prayer; not a year passed before the delegation of Thaqif came to Madinah declaring their Islam, so al-Taʾif became Muslim without being taken by the sword. In the account was the fiqh of balancing the possible against the hoped-for, and the effect of supplication where armies do not reach.`,
    ],
    source: `Ibn Hisham, al-Sira al-Nabawiyya · Sahih al-Bukhari`,
    disputed: `The siege was in Shawwal 8 AH and lasted about a month; its days are not agreed upon.`,
  },
  'abu-dawud-death': {
    year: `275 AH`,
    title: `The death of Imam Abu Dawud al-Sijistani`,
    summary: `Imam Abu Dawud Sulayman ibn al-Ashʿath — author of "al-Sunan," one of the Six Books, who selected from five hundred thousand hadiths four thousand eight hundred that gathered the hadiths of legal rulings — died in Basra.`,
    story: [
      `Abu Dawud was born in 202 AH in Sijistan and travelled to the lands, taking from Ahmad ibn Hanbal and his generation. He presented his book "al-Sunan" to him, and he approved it. Abu Dawud said: I mentioned in it the sound, what resembles it and what is close to it; and whatever had a severe weakness in it, I made clear.`,
      `He settled in Basra after the revolt of the Zanj to revive it with knowledge. It was said to him: Four hadiths from your book suffice the diligent seeker: "Deeds are by intentions," "Part of a person's good Islam is his leaving what does not concern him," "A believer is not a believer until he loves for his brother what he loves for himself," and "The lawful is clear and the unlawful is clear."`,
      `Ibrahim al-Harbi said of him: Hadith was made supple for Abu Dawud as iron was made supple for Dawud. He died in Basra on 16 Shawwal 275 AH, and his Sunan remains to this day a mainstay of jurists in the hadiths of rulings.`,
    ],
    source: `al-Dhahabi, Siyar Aʿlam al-Nubalaʾ · al-Khattabi, Maʿalim al-Sunan (introduction)`,
  },
  'tabari-death': {
    year: `310 AH`,
    title: `The death of Imam al-Tabari`,
    summary: `The imam of the exegetes and historians, Muhammad ibn Jarir al-Tabari — author of "Jamiʿ al-Bayan" in tafsir and "Tarikh al-Rusul wa'l-Muluk" — died in Baghdad. Of him it was said: if a man travelled to China to obtain his tafsir, it would not be too much.`,
    story: [
      `al-Tabari was born at Amul in Tabaristan in 224 AH, memorized the Qur'an at seven, and travelled in pursuit of knowledge from Rayy to Baghdad, Basra, Kufa, Syria and Egypt, until there gathered for him of the sciences what had gathered for no one of his age — and he would write forty pages a day.`,
      `He wrote "Jamiʿ al-Bayan ʿan Taʾwil Ay al-Qur'an," which became the mother of the tafsirs by transmission and the mainstay of those after him, and "Tarikh al-Rusul wa'l-Muluk," which became the most reliable reference for the history of early Islam. He also wrote "Tahdhib al-Athar" and had an independent juristic school that faded after him.`,
      `He lived unmarried, devoted to knowledge and writing, for about eighty years, and was offered the judgeship and the court of grievances but refused. He died in Baghdad in Shawwal 310 AH and was buried in his house at Rahbat Yaʿqub, and the people thronged to his funeral for days, praying at his grave.`,
    ],
    source: `Ibn Khallikan, Wafayat al-Aʿyan · al-Dhahabi, Siyar Aʿlam al-Nubalaʾ`,
    disputed: `The well-known view is that he died on Saturday 26 Shawwal 310 AH and was buried on Sunday; some sources say the 27th of it.`,
  },
  // ————————————————— Dhuʾl-Qaʿdah —————————————————
  'umrat-alqada': {
    year: `7 AH`,
    title: `The Compensatory ʿUmra (ʿUmrat al-Qadaʾ)`,
    summary: `The Prophet ﷺ entered Makkah to perform ʿUmra with two thousand Muslims chanting the talbiya, fulfilling a clause of the Treaty of Hudaybiyya after being turned away the previous year. He completed his ʿUmra over three days while Quraysh watched from the mountaintops.`,
    story: [
      `When Quraysh turned the Prophet ﷺ back from ʿUmra in the year of Hudaybiyya, it was among the terms of the treaty that the Muslims perform ʿUmra the following year and that Makkah be vacated for them for three days. So he ﷺ went out in Dhu'l-Qaʿda 7 AH with two thousand of those who had witnessed Hudaybiyya, their weapons with them for fear of treachery — which they left outside the Sanctuary.`,
      `He ﷺ entered Makkah upon his she-camel al-Qaswaʾ, with ʿAbdullah ibn Rawaha holding its rein, and the Muslims chanting the talbiya around the Kaʿba. He ordered them to walk briskly (raml) in the first three circuits to show the polytheists their strength, for they had said: a people whom the fever of Yathrib has weakened are coming to you.`,
      `He stayed three days and married Maymuna bint al-Harith, the last of the Mothers of the Believers, then departed in fulfilment of the condition. This ʿUmra had a great effect on the people of Makkah, who saw the might of Islam and the tranquillity of its people; only months later Khalid and ʿAmr ibn al-ʿAs embraced Islam.`,
    ],
    source: `Sahih al-Bukhari · Ibn Hisham, al-Sira al-Nabawiyya`,
    disputed: `He went out for it in Dhu'l-Qaʿda 7 AH by agreement — the month of all his ʿUmras — without fixing the day of departure.`,
  },
  'banu-qurayza': {
    year: `5 AH`,
    title: `The Expedition of Banu Qurayza`,
    summary: `As soon as the Prophet ﷺ returned from the Trench, Jibril commanded him to march against Banu Qurayza, who had broken the covenant and betrayed Madinah in its most critical hours. He besieged them until they submitted to the judgement of Saʿd ibn Muʿadh.`,
    story: [
      `Between Banu Qurayza and the Prophet ﷺ was a covenant of joint defence of Madinah, which they broke at the most critical hours of the Trench, intending to strike the Muslims from within. When the confederates withdrew, Jibril came at midday: Have you laid down your arms? The angels have not laid theirs down; rise to Banu Qurayza.`,
      `So he ﷺ called: "Let none pray ʿAsr except in Banu Qurayza," and besieged them twenty-five nights until they submitted to the judgement of their old ally Saʿd ibn Muʿadh, who was wounded from the Trench. He judged among them by the very ruling of the Torah concerning traitors.`,
      `The Prophet ﷺ carried out the judgement and said: "You have judged them by the judgement of the King." Thereby Madinah was purified of internal treachery and its rear was secured. Then Saʿd died of his wound, and at his death the Throne of the Most Merciful shook, as is authentically reported.`,
    ],
    source: `Sahih al-Bukhari and Muslim · Ibn Hisham, al-Sira al-Nabawiyya`,
    disputed: `It was in Dhu'l-Qaʿda 5 AH immediately after the Trench; the siege extended into early Dhu'l-Hijja, and its days are not definitively fixed.`,
  },
  'hudaybiyya': {
    year: `6 AH`,
    title: `The Treaty of Hudaybiyya and the Pledge of Ridwan`,
    summary: `The Prophet ﷺ went out to perform ʿUmra but Quraysh turned him back, so his Companions pledged to him under the tree unto death. Then came the treaty whose outward form was a hardship but whose inner reality was a conquest — and Allah named it a clear victory.`,
    story: [
      `He ﷺ went out in Dhu'l-Qaʿda 6 AH with one thousand four hundred to perform ʿUmra, seeking no war, but Quraysh turned them back at Hudaybiyya. When it was rumoured that his envoy ʿUthman ibn ʿAffan had been killed, he called for the pledge, and they pledged to him under the tree not to flee. So Allah revealed: "Allah was well pleased with the believers when they pledged allegiance to you under the tree."`,
      `Then Suhayl ibn ʿAmr came and the treaty was concluded on a ten-year cessation of war, that the Muslims return that year and perform ʿUmra the next; and a condition that weighed heavily on the Muslims: that whoever came to Muhammad from Quraysh as a Muslim be returned to them — until ʿUmar said: Why should we give away a lowering in our religion?`,
      `Surat al-Fath was revealed on the way back: "Indeed We have granted you a clear victory." And Allah spoke truly; the people felt secure and mixed, and in two years as many entered Islam as had entered it before that, and the treaty was the prelude to the conquest of Makkah itself.`,
    ],
    source: `Sahih al-Bukhari (the Book of Conditions) · Ibn Hisham, al-Sira al-Nabawiyya`,
    disputed: `It was in Dhu'l-Qaʿda 6 AH by agreement; the treaty was concluded near the end of the stay at Hudaybiyya, and its day is not definitively fixed.`,
  },
  'qutuz-death': {
    year: `658 AH`,
    title: `The killing of Sultan Qutuz`,
    summary: `Sultan al-Muzaffar Sayf al-Din Qutuz, hero of ʿAyn Jalut, was treacherously killed as he returned victorious to Cairo, less than two months after his immortal triumph, and Baybars assumed the sultanate after him.`,
    story: [
      `After ʿAyn Jalut and the cleansing of Syria of the Mongols, Qutuz set out returning to Egypt to enter it as a conqueror. On the way, near al-Salihiyya in the eastern Delta, he went out to hunt with a party of the emirs.`,
      `Between him and Baybars and a group of emirs was a grievance over promises and fiefs — some say old feuds going back to the killing of Faris al-Din Aqtay — so they assassinated him on 16 Dhu'l-Qaʿda 658 AH, only about fifty days separating his death from his great victory.`,
      `The emirs pledged the sultanate to Baybars, who — despite the tragedy in his accession — became one of the greatest sultans of Islam in jihad and building. Qutuz remained in the Ummah's memory a hero who rescued it in its darkest hour and whose life was taken at the peak of his glory.`,
    ],
    source: `al-Maqrizi, al-Suluk · Ibn Taghribirdi, al-Nujum al-Zahira`,
  },
  'manzikert': {
    year: `463 AH`,
    title: `The Battle of Manzikert`,
    summary: `The Seljuk Sultan Alp Arslan, with about twenty thousand, defeated the army of the Byzantine emperor Romanos — over two hundred thousand — and captured the emperor himself, opening Anatolia to Islam and the Turks.`,
    story: [
      `Romanos IV mustered a vast army to uproot the Seljuks and recover Armenia. Alp Arslan met him near Manzikert north of Lake Van with a small force of cavalry and offered peace, which the emperor refused, proud of his numbers.`,
      `The Sultan donned white on Friday, embalmed himself and said: If I am killed, this is my shroud, prayed with the army, and had the preachers supplicate for the Muslims on the pulpits — by the arrangement of the caliph al-Qaʾim bi-Amr Allah. Then he charged with the Turkic tactic of feigned retreat until the Byzantine army was torn apart and Romanos fell captive.`,
      `It was the first time a Byzantine emperor was taken captive in war with the Muslims; Alp Arslan honoured him, ransomed him and made a covenant with him. After it Anatolia opened to the migrations of the Turkmen, and the Seljuks of Rum then the House of Osman arose — and from Manzikert began the road to Constantinople.`,
    ],
    source: `Ibn al-Athir, al-Kamil fi'l-Tarikh · Sibt ibn al-Jawzi, Mirʾat al-Zaman`,
    disputed: `It occurred on a Friday in Dhu'l-Qaʿda 463 AH (August 1071); references give 20 Dhu'l-Qaʿda approximately in the calendar conversion.`,
  },
  'ibn-taymiyya-death': {
    year: `728 AH`,
    title: `The death of Shaykh al-Islam Ibn Taymiyya`,
    summary: `Ahmad ibn ʿAbd al-Halim ibn Taymiyya died a prisoner in the citadel of Damascus after paper and pen had been withheld from him. All of Damascus came out at his funeral, until it was said none stayed behind but one excused — sealing a life that filled the world with knowledge and jihad.`,
    story: [
      `Ibn Taymiyya was born in Harran in 661 AH, and his family migrated with him to Damascus before the Mongol advance. He excelled in the sciences until he gave fatwas and taught before the age of twenty, and gathered of the branches of knowledge what astonished his contemporaries. His student al-Dhahabi said of him: it was as though the Sunnah were before his eyes.`,
      `He stood against the Mongols on the day many fled, addressed Ghazan to his face, steadied the people on the day of Shaqhab and gave them the ruling to break their fast, and struggled with his tongue and pen against innovations, writing "Minhaj al-Sunna," "Darʾ al-Taʿarud" and the "Fatawa," gathered into scores of volumes.`,
      `He was tested repeatedly and imprisoned in Egypt and Syria, and would say: What can my enemies do to me? My Paradise and garden are in my breast. He was held at the end of his life in the citadel of Damascus over a fatwa; when he was barred from writing he read and worshipped until he died on the night of 20 Dhu'l-Qaʿda 728 AH, and a countless multitude accompanied his funeral.`,
    ],
    source: `Ibn Kathir, al-Bidaya wa'l-Nihaya · Ibn ʿAbd al-Hadi, al-ʿUqud al-Durriyya`,
  },
  'ibn-alnafis-death': {
    year: `687 AH`,
    title: `The death of Ibn al-Nafis, discoverer of the pulmonary circulation`,
    summary: `The learned physician ʿAlaʾ al-Din Ibn al-Nafis — who described the pulmonary (lesser) circulation of the blood four centuries before the Europeans — died in Cairo, and endowed his house and books to the Mansuri hospital.`,
    story: [
      `Ibn al-Nafis was born in Damascus around 607 AH and studied medicine at the Nuri hospital, then moved to Cairo, where he headed its physicians and worked at the Nasiri then the Mansuri hospital. Alongside medicine he combined Shafiʿi jurisprudence, legal theory and logic.`,
      `In his "Commentary on the Anatomy of the Canon" he differed with Galen and Ibn Sina, who held that blood passed from the right ventricle to the left through pores in the septum. He established that the blood passes from the right ventricle to the lung, is aerated there, then returns to the left — the very description of the pulmonary circulation that the Europeans did not reach for centuries.`,
      `He also wrote "al-Shamil fi'l-Sinaʿa al-Tibbiyya," which he planned in three hundred volumes, and "al-Mujaz fi'l-Qanun," which physicians circulated for centuries. When death approached him he refused wine as medicine and said: I will not meet Allah with any of it in my belly, and he died in Cairo in Dhu'l-Qaʿda 687 AH.`,
    ],
    source: `al-Safadi, al-Wafi bi'l-Wafayat · Ibn Abi Usaybiʿa, ʿUyun al-Anbaʾ`,
    disputed: `The well-known view is that he died on 21 Dhu'l-Qaʿda 687 AH; some sources differ slightly over the day.`,
  },

  // ————————————————— Dhuʾl-Hijjah —————————————————
  'hajjat-alwadaa': {
    year: `10 AH`,
    title: `The Farewell Pilgrimage — the Day of Tarwiya`,
    summary: `On the Day of Tarwiya the Prophet ﷺ set out with a hundred thousand of his Companions from Makkah to Mina in his only pilgrimage, in which he taught the Ummah its rites, saying: "Take from me your rites of pilgrimage," and bade it farewell.`,
    story: [
      `The Prophet ﷺ announced his Hajj, and people streamed to Madinah from every side. He went out with them in late Dhu'l-Qaʿda 10 AH, and when the eighth of Dhu'l-Hijja came — the Day of Tarwiya — he set out with those with him from Makkah to Mina, prayed the five prayers there and spent the night.`,
      `About a hundred thousand or more were with him, all following him in every movement and stillness, watching his talbiya and rites, as he said: "Take from me your rites of pilgrimage, for perhaps I shall not meet you after this year of mine." It was a pilgrimage of conveyance, instruction and farewell.`,
      `He ﷺ arranged the rites that Muslims follow to this day: Mina, then ʿArafa, then Muzdalifa, the stoning of the pillars, the sacrifice and the tawaf. He stood answering questions: "Do it, and there is no blame." So his pilgrimage remained the eternal model for every pilgrim until the Hour comes.`,
    ],
    source: `Sahih Muslim (the long hadith of Jabir on the description of the Prophet's ﷺ Hajj)`,
  },
  'arafat-sermon': {
    year: `10 AH`,
    title: `The Farewell Sermon and the revelation of "Today I have perfected your religion"`,
    summary: `The Prophet ﷺ stood at ʿArafa addressing the greatest gathering the Peninsula had witnessed. He affirmed the sanctity of blood and wealth, abolished the usury and blood-feuds of Jahiliyya, enjoined kindness to women, called Allah to witness the conveyance, and the verse of the perfection of the religion was revealed.`,
    story: [
      `He ﷺ addressed the people on the Day of ʿArafa upon his she-camel and said: "Your blood and your property are sacred to you like the sanctity of this day of yours, in this month of yours, in this land of yours." He abolished all the usury of Jahiliyya — the first he abolished being the usury of his uncle al-ʿAbbas — and its blood-feuds — the first he abolished being the blood of Ibn Rabiʿa.`,
      `He enjoined good treatment of women: "Fear Allah regarding women, for you have taken them by the trust of Allah," affirmed that the Muslim is the brother of the Muslim, and that no Arab has precedence over a non-Arab except by piety, and said: "I have left among you that after which you will not go astray if you hold to it: the Book of Allah." Then he said: "Have I conveyed?" They said: Yes. He said: "O Allah, bear witness."`,
      `On the evening of that day was revealed: "Today I have perfected for you your religion and completed My favour upon you and have approved for you Islam as religion." ʿUmar wept and said: After perfection there is nothing but decline — sensing the nearness of the Prophet's ﷺ end; and so it was, for he died some eighty nights later.`,
    ],
    source: `Sahih Muslim (the hadith of Jabir) · Sahih al-Bukhari (the revelation of the verse "Today I have perfected")`,
  },
  'first-eid-adha': {
    year: `2 AH`,
    title: `The first Eid al-Adha in Islam`,
    summary: `The Prophet ﷺ led the Muslims in the first Eid al-Adha prayer in Madinah and sacrificed two horned white rams which he slaughtered with his own hand, reviving the way of Ibrahim — a Sunnah that endures in the Ummah until the Day of Resurrection.`,
    story: [
      `In the second year of the Hijra the two Eid prayers and the sacrifice were legislated. He ﷺ went out on the day of Nahr to the prayer-ground, led the people in two rakʿas, then addressed them and ordered whoever had not slaughtered to slaughter after the prayer, saying: "Whoever slaughters before the prayer, it is only meat he has offered to his family."`,
      `He ﷺ sacrificed two horned white rams, slaughtering them with his noble hand, naming Allah and saying the takbir and placing his foot on their sides, as Anas narrated in the two Sahihs — reviving the Sunnah of his father Ibrahim when Allah ransomed his son Ismaʿil with a great sacrifice.`,
      `The Day of Nahr became the most sacred day of the year; he ﷺ named it "the day of the Greatest Hajj." On it two rites join for the Muslims — the Eid prayer and the sacrifice — and for the pilgrims of Allah's House there join in it the stoning of the pillar, the sacrifice, the shaving and the tawaf.`,
    ],
    source: `Sahih al-Bukhari and Muslim (the hadiths of the sacrifice and the Eid prayer)`,
  },
  'aqaba-pledge': {
    year: `13 of the Prophethood`,
    title: `The Second Pledge of al-ʿAqaba`,
    summary: `Seventy-three men and two women of the Ansar secretly pledged allegiance to the Messenger of Allah ﷺ in the glen of al-ʿAqaba at Mina during the nights of Tashriq, that they would protect him as they protected themselves and their families. The pledge was the gateway to the Hijra and the founding of the state.`,
    story: [
      `After a group of the Khazraj had embraced Islam in an earlier season and the flame of Islam blazed again in Yathrib, seventy-three men and two women came in the season of the thirteenth year of the mission. The Prophet ﷺ appointed to meet them in the glen of al-ʿAqaba on the middle of the days of Tashriq by night, and they slipped from their camps like sandgrouse.`,
      `al-ʿAbbas, the Prophet's ﷺ uncle, attended to secure a guarantee for his nephew, and the people said: Take for your Lord and for yourself what you will. He stipulated for Allah His worship alone, and for himself and his Companions protection and defence. They said: And what is ours if we fulfil it? He said: "Paradise." They said: Stretch out your hand — and they pledged to him.`,
      `One of them said: By Allah, if you wish, we will fall upon the people of Mina tomorrow with our swords. He ﷺ said: "We have not been commanded to that," and chose from them twelve leaders. Only months passed before he permitted his Companions to migrate to the abode of the Ansar. So the Second ʿAqaba was the first brick in the building of the state.`,
    ],
    source: `Ibn Hisham, al-Sira al-Nabawiyya · Musnad al-Imam Ahmad`,
    disputed: `It was by night during the days of Tashriq (11–13 Dhu'l-Hijja) of the 13th year of the mission; the well-known view is the night of the middle of the days of Tashriq.`,
  },
  'uthman-martyrdom': {
    year: `35 AH`,
    title: `The martyrdom of ʿUthman ibn ʿAffan (may Allah be pleased with him)`,
    summary: `The rebels stormed the house of the aged caliph ʿUthman ibn ʿAffan after a forty-day siege and killed him while he was fasting and reciting the Qur'an. He had refused that a Muslim's blood be shed in his defence, so his killing was the door to strife to this day.`,
    story: [
      `Bands from the provinces, incited by the detractors, came to Madinah and besieged ʿUthman's house and cut off his water — he who had bought the well of Ruma for the Muslims. The Companions offered to fight in his defence, but he refused and adjured them to hold back, saying: I will not be the first to succeed the Messenger of Allah over his Ummah by shedding blood.`,
      `He reminded them of the Prophet's ﷺ words on the Day of Hiraʾ, when he gave him glad tidings of Paradise upon an affliction that would befall him, and said: I heard the Messenger of Allah say, "The blood of a Muslim man is not lawful except in one of three cases," and by Allah I have done none of them.`,
      `On Friday 18 Dhu'l-Hijja 35 AH the people scaled the wall upon him and killed him while he was fasting, reading the Mushaf, and his blood dripped upon Allah's words: "Allah will suffice you against them, and He is the Hearing, the Knowing." He was buried in al-Baqiʿ, and by his killing arose the strife of which the Prophet ﷺ had said to ʿUthman decades before: "Hold fast until you meet me."`,
    ],
    source: `al-Tabari, Tarikh al-Rusul wa'l-Muluk · al-Dhahabi, Siyar Aʿlam al-Nubalaʾ`,
  },
  'umar-stabbing': {
    year: `23 AH`,
    title: `The stabbing of the Commander of the Faithful ʿUmar ibn al-Khattab`,
    summary: `The Magian Abu Luʾluʾa stabbed the Commander of the Faithful ʿUmar ibn al-Khattab with a poisoned dagger as he led the people in the Fajr prayer. He bore his wounds for days, in which he made the caliphate a council among six, then joined his two companions and was buried with them.`,
    story: [
      `ʿUmar used to supplicate: O Allah, grant me martyrdom in Your cause and make my death in the city of Your Messenger. Allah answered him in the most wondrous way: Abu Luʾluʾa Fayruz, the slave of al-Mughira, resentful of the conquest of the lands of Persia, stabbed him six blows as he stood in the prayer-niche of Fajr, and stabbed thirteen men with him.`,
      `ʿUmar was brought a drink of nabidh, and it came out of his wound; then milk, and it came out of his wound, so he knew he was dying. He kept asking: Who killed me? When it was said: Abu Luʾluʾa, he said: Praise be to Allah who did not make my death at the hand of a man who claims Islam.`,
      `He asked ʿAʾisha's permission to be buried with his two companions, and she granted it, saying: I had wanted it for myself, but I shall prefer him over myself today. He made the affair a council among the six with whom the Messenger of Allah ﷺ was pleased when he died, and passed away three days after the stabbing, buried in the noble chamber, the third of three.`,
    ],
    source: `Sahih al-Bukhari (the full account of ʿUmar's killing) · al-Tabari, Tarikh al-Rusul wa'l-Muluk`,
    disputed: `He was stabbed on Wednesday with four nights remaining of Dhu'l-Hijja 23 AH (the 26th of it by the well-known view), died three days later, and was buried at the beginning of Muharram 24 AH.`,
  },
  'ibn-hajar-death': {
    year: `852 AH`,
    title: `The death of al-Hafiz Ibn Hajar al-ʿAsqalani`,
    summary: `The Commander of the Faithful in hadith, Ahmad ibn ʿAli ibn Hajar al-ʿAsqalani — author of "Fath al-Bari," the commentary on Sahih al-Bukhari — died in Cairo and was carried in a funeral attended by the sultan, the caliph and tens of thousands under the rain.`,
    story: [
      `Ibn Hajar was born in Egypt in 773 AH and grew up an orphan. He memorized the Qur'an at nine, and travelled for hadith to the Hijaz, Yemen and Syria until he surpassed the people of his age, and held the judgeship of Egypt several times and the dictation of hadith at the Citadel of the Mountain.`,
      `He wrote about a hundred and fifty works, foremost among them "Fath al-Bari," on which he spent a quarter of a century until it was said: there is no Hijra after the Fath — as well as "al-Isaba fi Tamyiz al-Sahaba," "Tahdhib al-Tahdhib," "Lisan al-Mizan," "Bulugh al-Maram" and "Nukhbat al-Fikar" — so he became the mainstay of hadith scholars after him.`,
      `He died on the night of Saturday 28 Dhu'l-Hijja 852 AH, so Cairo shut its markets, and at his funeral came the caliph, the sultan, the judges and multitudes estimated at fifty thousand while the rain fell, until it was said: the sky sprinkled its tears at the loss of the hafiz.`,
    ],
    source: `al-Sakhawi, al-Jawahir wa'l-Durar fi Tarjamat Shaykh al-Islam Ibn Hajar`,
  },
};

export const OTD_UR: Record<string, OtdContent> = {
  // ————————————————— محرم —————————————————
  'hijri-calendar-adopted': {
    year: `17ھ`,
    title: `ہجری تقویم کا اعتماد`,
    summary: `امیر المؤمنین عمر بن الخطاب رضی اللہ عنہ کے دورِ خلافت میں صحابہ کرام جمع ہوئے تاکہ اسلامی ریاست کے لیے ایک متفقہ نظامِ تاریخ طے کریں۔ رائے اس پر جمی کہ نبی کریم ﷺ کی ہجرت کو تاریخ کا مبدأ بنایا جائے، اور محرم کو سال کا پہلا مہینہ قرار دیا گیا۔`,
    story: [
      `جب عمر بن الخطاب رضی اللہ عنہ کے عہد میں اسلامی ریاست وسیع ہوئی اور صوبوں کے درمیان خط و کتابت بڑھی، تو آپ کے پاس ایسے خطوط آئے جن پر کوئی تاریخ درج نہ تھی۔ چنانچہ آپ نے بڑے صحابہ کو جمع کیا تاکہ ایسا مبدأِ تاریخ مقرر کریں جس سے اعمال اور عہد و پیمان ضبط ہو سکیں۔`,
      `تجاویز مختلف تھیں: کسی نے نبی کریم ﷺ کی ولادت سے تاریخ کی رائے دی اور کسی نے بعثت سے۔ علی بن ابی طالب رضی اللہ عنہ نے ہجرت سے تاریخ مقرر کرنے کی رائے دی، کیونکہ اسی نے حق و باطل میں فرق کیا اور مسلمانوں کی ریاست قائم کی — چنانچہ عمر رضی اللہ عنہ نے یہی رائے اختیار کی۔`,
      `اور اس بات پر اتفاق ہوا کہ محرم سال کا آغاز ہو، کیونکہ اسی میں لوگ اپنے حج سے لوٹتے ہیں۔ اسی وقت سے ہجری تقویم امت کا کیلنڈر بن گیا، جس سے وہ آج تک اپنی عبادات اور مناسبتیں ضبط کرتی ہے۔`,
    ],
    source: `الطبری، تاریخ الرسل والملوک · ابن کثیر، البدایہ والنہایہ`,
    disputed: `مشہور یہی ہے کہ یہ 17ھ میں ہوا، اور 16ھ بھی مروی ہے۔ یہاں اسے محرم کے آغاز میں رکھا گیا ہے کیونکہ وہی اُس سال کا پہلا مہینہ ہے جسے مبدأِ تاریخ بنایا گیا۔`,
  },
  'bayah-uthman': {
    year: `24ھ`,
    title: `عثمان بن عفان رضی اللہ عنہ کی خلافت پر بیعت`,
    summary: `عمر بن الخطاب رضی اللہ عنہ اپنے زخم سے وفات پا گئے تو اُن کی نامزد کردہ چھ رکنی شوریٰ جمع ہوئی، اور معاملہ عثمان بن عفان رضی اللہ عنہ — تیسرے خلیفہ راشد — کی بیعت پر منتہی ہوا۔`,
    story: [
      `عمر بن الخطاب رضی اللہ عنہ نے خلافت اپنے بعد چھ بڑے صحابہ کی شوریٰ میں رکھی جن سے رسول اللہ ﷺ اپنی وفات کے وقت راضی تھے: عثمان، علی، طلحہ، زبیر، سعد بن ابی وقاص اور عبد الرحمٰن بن عوف رضی اللہ عنہم۔`,
      `عبد الرحمٰن بن عوف نے اپنا حق چھوڑ کر انتخاب کی ذمہ داری سنبھالی، اور تین دن رات مدینہ کے لوگوں سے مشورہ کرتے رہے، یہاں تک کہ فرمایا: میں نے دیکھا کہ لوگ عثمان پر کسی کو ترجیح نہیں دیتے۔`,
      `چنانچہ غرہ محرم 24ھ کو عبد الرحمٰن نے عثمان بن عفان کی بیعت کی، اور لوگ پے در پے اُن کی بیعت پر جمع ہوئے۔ اُن کی خلافت میں فتوحات کا پھیلاؤ ہوا اور لوگ ایک ہی مصحف پر جمع ہوئے۔`,
    ],
    source: `الطبری، تاریخ الرسل والملوک · ابن الأثیر، الکامل فی التاریخ`,
    disputed: `عثمان کی بیعت عمر کی تدفین کے تین راتوں بعد ہوئی، مشہور قول کے مطابق غرہ محرم 24ھ کو؛ بعض نے اسے اواخرِ ذوالحجہ 23ھ میں رکھا ہے۔`,
  },
  'khaybar': {
    year: `7ھ`,
    title: `غزوۂ خیبر`,
    summary: `صلحِ حدیبیہ کے بعد نبی کریم ﷺ اپنے صحابہ کے ساتھ مدینہ کے شمال میں خیبر کے قلعوں کی طرف روانہ ہوئے۔ سخت محاصرے کے بعد اللہ نے علی بن ابی طالب رضی اللہ عنہ کے ہاتھوں اس کی فتح عطا کی، اور مسلمانوں نے اپنا شمالی محاذ محفوظ کر لیا۔`,
    story: [
      `جب مسلمان صلحِ حدیبیہ کے ذریعے قریش کی طرف سے مطمئن ہو گئے تو نبی کریم ﷺ اپنے اُن قریباً چودہ سو صحابہ کے ساتھ جو حدیبیہ میں شریک تھے خیبر کی طرف نکلے، جو حجاز میں یہود کا سب سے بڑا اور مضبوط ترین قلعہ تھا۔`,
      `مسلمانوں نے قلعوں کا محاصرہ کیا اور جنگ طویل ہو گئی، تو آپ ﷺ نے فرمایا: "کل میں جھنڈا ایسے شخص کو دوں گا جو اللہ اور اس کے رسول سے محبت کرتا ہے اور اللہ اور اس کا رسول اُس سے محبت کرتے ہیں؛ اللہ اُس کے ہاتھوں فتح دے گا۔" آپ نے وہ علی بن ابی طالب رضی اللہ عنہ کو دیا، اور اللہ نے اُن کے ہاتھوں سب سے مضبوط قلعہ "القموص" فتح کیا۔`,
      `نبی کریم ﷺ نے اہلِ خیبر سے اس شرط پر صلح کی کہ وہ زمین میں کام کریں اور پیداوار کا نصف لیں۔ خیبر کی فتح نے مدینہ کے شمال کو محفوظ کیا اور بعد کی فتوحات کی راہ ہموار کی۔`,
    ],
    source: `ابن ہشام، السیرہ النبویہ · صحیح البخاری (حدیثِ رایت)`,
    disputed: `ابن اسحاق کے مطابق نبی کریم ﷺ اواخرِ محرم 7ھ میں خیبر کے لیے نکلے؛ بعض نے جمادی الاولیٰ کہا ہے۔ مصادر میں دنِ روانگی کی قطعی تعیین نہیں۔`,
  },
  'karbala': {
    year: `61ھ`,
    title: `کربلا میں حسین بن علی رضی اللہ عنہما کی شہادت`,
    summary: `10 محرم 61ھ کو عاشوراء کے دن رسول اللہ ﷺ کے نواسے اور آپ کے پھول حسین بن علی رضی اللہ عنہما اپنے اہلِ بیت اور اصحاب کے ایک گروہ سمیت عراق کی سرزمینِ کربلا میں شہید کیے گئے — یہ اسلامی تاریخ کے عظیم ترین المیوں میں سے ہے۔`,
    story: [
      `حسین رضی اللہ عنہ مکہ سے کوفہ کی طرف روانہ ہوئے جب اہلِ کوفہ کے پے در پے خطوط اُنہیں آنے کی دعوت دیتے رہے۔ جب آپ اُس کے قریب پہنچے تو قوم نے دغا کی اور آپ کو بے یار و مددگار چھوڑ دیا؛ آپ کربلا میں گھیر لیے گئے اور آپ اور آپ کے اہلِ خانہ سے پانی روک دیا گیا۔`,
      `جمعہ کے دن دس محرم کو نامساوی جنگ ہوئی، حسین رضی اللہ عنہ نے بہادروں کی طرح جنگ کی یہاں تک کہ اپنے اہلِ بیت اور اصحاب میں سے قریباً ستر افراد سمیت شہید ہوئے، جن میں آپ کے بھائی اور بیٹے بھی تھے۔`,
      `اُن کی شہادت نے پوری امت کو ہلا دیا، اور اہلِ علم نے اسے عظیم ترین مصیبتوں میں شمار کیا۔ ابن کثیر نے کہا: "اُن کے ساتھ شہید ہونے والے اہلِ بیت کی کثرت اور فضیلت میں اُن جیسا کوئی شہید نہ ہوا۔" اِس کی یاد نبی کریم ﷺ کے اہلِ بیت کی حرمت کی حفاظت کے وجوب پر ایک سبق بنی رہی۔`,
    ],
    source: `الطبری، تاریخ الرسل والملوک · ابن کثیر، البدایہ والنہایہ`,
  },
  'baybars-death': {
    year: `676ھ`,
    title: `سلطان الظاہر بیبرس کی وفات`,
    summary: `الظاہر رکن الدین بیبرس البندقداری — عین جالوت کے ہیرو، صلیبیوں اور مغلوں کے شکست دینے والے، اور مملوک سلاطین میں سے ایک عظیم ترین جنہوں نے قاہرہ میں عباسی خلافت کا وقار بحال کیا — دمشق میں وفات پا گئے۔`,
    story: [
      `بیبرس ایک ترک مملوک تھے جو بچپن میں غلاموں کے بازار میں بیچے گئے، پھر اپنی بہادری اور دانائی سے ترقی کرتے ہوئے لشکروں کے سپہ سالار بنے۔ ساتویں صلیبی مہم کی شکست اور المنصورہ میں لوئی نہم کی گرفتاری میں شریک رہے۔`,
      `آپ عین جالوت کی معرکے کے ہیروؤں میں سے تھے جس نے 658ھ میں مغلوں کو توڑا؛ پھر سلطنت اُن کے ہاتھ آئی۔ آپ نے سترہ سال مسلسل جہاد میں گزارے، جن میں صلیبیوں سے اُن کے بڑے قلعے جیسے انطاکیہ، ارسوف اور صفد چھینے۔`,
      `بیبرس نے بغداد کے سقوط کے بعد قاہرہ میں عباسی خلافت کو زندہ کیا، اور ڈاک، فوج اور عدلیہ کو منظم کیا، یہاں تک کہ 28 محرم 676ھ کو دمشق میں وفات پائی، جہاں آج الظاہریہ لائبریری واقع ہے وہیں دفن ہوئے۔`,
    ],
    source: `المقریزی، السلوک لمعرفہ دول الملوک · ابن تغری بردی، النجوم الزاہرہ`,
    disputed: `مشہور یہ ہے کہ اُن کی وفات 28 محرم 676ھ کو ہوئی؛ بعض نے 27 کہا ہے۔`,
  },
  'grand-mosque-seizure': {
    year: `1400ھ`,
    title: `حرمِ مکی کا واقعہ`,
    summary: `پندرہویں ہجری صدی کے پہلے دن کی صبح ایک مسلح گروہ نے جہیمان العتیبی کی قیادت میں مسجدِ حرام پر قبضہ کر کے نمازیوں کو یرغمال بنا لیا، یہ واقعہ قریباً دو ہفتے جاری رہا اور اس نے پورے عالمِ اسلام کو ہلا دیا۔`,
    story: [
      `یکم محرم 1400ھ (20 نومبر 1979ء) کی صبح، جب نمازی فجر کی تیاری کر رہے تھے، ایک مسلح گروہ نے مسجدِ حرام کے دروازے بند کر دیے اور "منتظر مہدی" — محمد بن عبد اللہ القحطانی، جو اُن کے قائد جہیمان العتیبی کے داماد تھے — کے ظہور کے دعوے کیے۔`,
      `علماء نے اس فعل کی مذمت کی اور حرم میں پناہ گزینوں سے قتال کے جواز کا فتویٰ دیا، اللہ کے اس فرمان کی بنیاد پر: "اور مسجدِ حرام کے پاس اُن سے نہ لڑو یہاں تک کہ وہ تم سے لڑیں؛ پس اگر وہ لڑیں تو اُنہیں قتل کرو۔" شدید جھڑپیں ہوئیں جو قریباً دو ہفتوں بعد حرم کی بازیابی پر ختم ہوئیں۔`,
      `اس واقعے میں سینکڑوں افراد ہلاک و زخمی ہوئے۔ جہیمان اور اُس کے باقی ماندہ ساتھی گرفتار کر کے سزائے موت دیے گئے، اور یہ واقعہ امت کے لیے غلو اور جھوٹے دعوائے مہدیت کے خطرے پر ایک عبرت انگیز سبق بنا رہا۔`,
    ],
    source: `دستاویزات و مصادرِ معاصر تاریخ (20 نومبر 1979ء کے واقعے کی مستند رپورٹیں)`,
  },

  // ————————————————— صفر —————————————————
  'ghazwat-alabwa': {
    year: `2ھ`,
    title: `غزوۂ اَبواء (وَدّان) — نبی کریم ﷺ کا پہلا غزوہ`,
    summary: `نبی کریم ﷺ خود اپنے پہلے غزوے میں اَبواء کی طرف نکلے تاکہ قریش کے قافلے کا راستہ روکیں۔ کوئی جنگ نہ ہوئی، اور وہاں بنو ضمرہ سے معاہدہ کیا — یہ ہجرت کے بعد نبوی عسکری سرگرمی کا آغاز تھا۔`,
    story: [
      `جب اللہ نے مسلمانوں کو قتال کی اجازت دی — "اُن لوگوں کو (لڑنے کی) اجازت دی جاتی ہے جن سے (ظلماً) لڑا جا رہا ہے کیونکہ اُن پر ظلم ہوا" — تو نبی کریم ﷺ نے سرایا بھیجنا شروع کیا، پھر خود صفر میں دوسرے سالِ ہجری کے آغاز پر مکہ اور مدینہ کے درمیان اَبواء کی طرف نکلے۔`,
      `آپ نے مدینہ پر سعد بن عبادہ رضی اللہ عنہ کو نائب مقرر کیا، اور خاص مہاجرین کے ساتھ قریش کے قافلے کا راستہ روکنے نکلے۔ کوئی مزاحمت پیش نہ آئی، اور راستے میں بنو ضمرہ سے عدمِ جارحیت کا معاہدہ کیا کہ وہ آپ کے خلاف جتھا نہ بنائیں گے اور نہ کسی دشمن کی مدد کریں گے۔`,
      `اگرچہ اس میں کوئی جنگ نہ ہوئی، مگر اَبواء مسلمانوں کے دفاع سے پیش قدمی کی طرف منتقل ہونے کا اعلان تھا، اور اپنی نوزائیدہ ریاست اور اُس کے تجارتی راستوں کی حفاظت کی عملی مشق تھی۔`,
    ],
    source: `ابن ہشام، السیرہ النبویہ · ابن سعد، الطبقات الکبریٰ`,
    disputed: `اہلِ سیر کے اتفاق سے یہ صفر 2ھ میں ہوا؛ مصادر میں اس کے دن کی قطعی تعیین نہیں۔`,
  },
  'baghdad-fall': {
    year: `656ھ`,
    title: `مغلوں کے ہاتھوں بغداد کا سقوط`,
    summary: `ہلاکو کے مغل لشکر نے سخت محاصرے کے بعد عباسی خلافت کے دار الحکومت بغداد میں داخل ہو کر چالیس دن اسے تاراج کیا اور لاکھوں کو قتل کیا، اور خلیفہ المستعصم مارے گئے — یوں پانچ صدیوں پر پھیلی خلافت کا صفحہ لپیٹ دیا گیا۔`,
    story: [
      `چنگیز خان کے پوتے ہلاکو نے اواخرِ 655ھ میں بھاری لشکروں کے ساتھ بغداد کی طرف پیش قدمی کی اور اس کا محاصرہ کیا۔ خلیفہ المستعصم باللہ اسے دفع کرنے سے عاجز رہے، کیونکہ فوج نظر انداز ہو چکی تھی، اتحاد بکھر چکا تھا اور درباریوں نے دغا کی۔`,
      `4 صفر 656ھ (فروری 1258ء) کو مغل شہر میں داخل ہوئے، اور وہاں ایسا قتل و غارت ہوا جس سے رونگٹے کھڑے ہوتے ہیں؛ مقتولین کا اندازہ لاکھوں میں لگایا گیا، اور بغداد کی لائبریریوں کی کتابیں دجلہ میں پھینکی گئیں یہاں تک کہ کہا گیا کہ اُس کا پانی سیاہی سے کالا ہو گیا۔`,
      `چند دن بعد خلیفہ المستعصم قتل کر دیے گئے، اور بغداد میں عباسی خلافت پانچ صدیوں بعد ختم ہو گئی۔ مؤرخین نے اس آفت کو اسلام کی عظیم ترین مصیبتوں میں شمار کیا — یہاں تک کہ مسلمانوں نے دو سال بعد عین جالوت میں اس کا بدلہ لے لیا۔`,
    ],
    source: `ابن کثیر، البدایہ والنہایہ · الذہبی، تاریخ الإسلام`,
  },
  'ibn-rushd-death': {
    year: `595ھ`,
    title: `فلسفی ابن رشد کی وفات`,
    summary: `ابو الولید محمد بن رشد قرطبی — قرطبہ کے قاضی، طبیب اور فلسفی، ارسطو کے شارح جن کی تصانیف نے صدیوں تک یورپی فکر کو متاثر کیا، اور فقہِ مقارن میں "بدایۃ المجتہد" کے مصنف — مراکش میں وفات پا گئے۔`,
    story: [
      `ابن رشد 520ھ میں قرطبہ کے ایک علمی و قضائی گھرانے میں پیدا ہوئے۔ آپ نے فقہ، طب، فلسفہ اور فلکیات کو جمع کیا، اشبیلیہ کی قضا پھر قرطبہ کی بڑی قضا سنبھالی، اور موحدی خلیفہ کے خاص طبیب رہے۔`,
      `خلیفہ ابو یعقوب یوسف نے اُنہیں ارسطو کی کتب کی شرح پر مامور کیا، تو آپ نے اپنی مشہور شروحات لکھیں جو لاطینی اور عبرانی میں ترجمہ ہوئیں، اور یورپ میں "عظیم شارح" کے نام سے معروف ہوئے، اور قرونِ وسطیٰ کے یورپی فلاسفہ پر گہرا اثر ڈالا۔`,
      `عمر کے آخر میں آپ آزمائے گئے اور اَلِیسانہ (لوسینا) جلاوطن کیے گئے، پھر معاف کر دیے گئے۔ 9 صفر 595ھ کو مراکش میں وفات پائی، پھر آپ کا جسم قرطبہ منتقل کیا گیا۔ آپ کی باقی کتابوں میں "بدایۃ المجتہد ونہایۃ المقتصد"، "تہافت التہافت" اور "الکلیات فی الطب" ہیں۔`,
    ],
    source: `ابن أبی أصیبعہ، عیون الأنباء · الذہبی، سیر أعلام النبلاء`,
  },
  'siffin': {
    year: `37ھ`,
    title: `معرکۂ صفّین اور مصاحف کا بلند کیا جانا`,
    summary: `فرات کے کنارے صفّین میں خلیفہ علی بن ابی طالب اور معاویہ بن ابی سفیان رضی اللہ عنہما کے لشکروں کے درمیان جنگ اپنے عروج کو پہنچی، یہاں تک کہ تحکیم کی دعوت دیتے ہوئے مصاحف بلند کیے گئے — جنگ رک گئی اور تحکیم کا فتنہ شروع ہوا۔`,
    story: [
      `معرکۂ جمل کے بعد فتنہ شام منتقل ہوا، تو امیر المؤمنین علی رضی اللہ عنہ کا لشکر اور معاویہ رضی اللہ عنہ کی قیادت میں اہلِ شام کا لشکر الرقہ کے قریب صفّین میں آمنے سامنے ہوئے۔ جنگ کئی دن رات جاری رہی، جن میں سب سے شدید "لیلۃ الہریر" تھی جس میں ہتھیار نہ رکے۔`,
      `جب عمرو بن العاص نے پلڑا جھکتا دیکھا تو خون بہنے سے روکنے کے لیے نیزوں پر مصاحف بلند کرنے اور کتاب اللہ کی تحکیم کی طرف بلانے کا مشورہ دیا۔ اہلِ عراق قبول و انکار کے درمیان ڈگمگا گئے، اور علی رضی اللہ عنہ تحکیم قبول کرنے پر مجبور ہوئے۔`,
      `علی کے لشکر سے ایک گروہ نے تحکیم کا انکار کیا — یہی خوارج تھے جن سے آپ نے بعد میں نہروان میں جنگ کی۔ صفّین — جس میں جلیل القدر صحابی عمار بن یاسر شہید ہوئے — فتنۂ کبریٰ کے عظیم ترین مراحل میں سے رہی، جس میں صحابہ کے درمیان جو کچھ ہوا اُس میں اہلِ سنت زبان بند رکھتے ہیں۔`,
    ],
    source: `الطبری، تاریخ الرسل والملوک · ابن الأثیر، الکامل فی التاریخ`,
    disputed: `صفّین کے واقعات ذوالحجہ 36ھ سے صفر 37ھ تک جاری رہے؛ بڑی لڑائیوں کے دن اور مصاحف بلند کیے جانے کی تعیین میں روایات مختلف ہیں، مشہور یہ کہ صفر کے پہلے دس دنوں میں تھی۔`,
  },
  'nasai-death': {
    year: `303ھ`,
    title: `امام نسائی صاحبِ "السنن" کی وفات`,
    summary: `امام ابو عبد الرحمٰن احمد بن شعیب النسائی، صاحبِ "السنن الصغریٰ" — کتبِ ستہ میں سے ایک — وفات پا گئے۔ آپ نقدِ رجال میں محدثین میں سب سے سخت تھے، یہاں تک کہ کہا گیا: وہ مسلم سے بڑھ کر حافظ ہیں۔`,
    story: [
      `نسائی 215ھ میں خراسان کے علاقے نَسا میں پیدا ہوئے، اور طلبِ حدیث میں حجاز، عراق، شام اور مصر — جہاں آپ نے سکونت اختیار کی — کی طرف سفر کیا۔ آپ نے "السنن الکبریٰ" مرتب کی، پھر اُس سے "المجتبیٰ" (السنن الصغریٰ) منتخب کی جسے علماء نے صحیحین کے بعد شرائط میں کتبِ سنت میں سب سے دقیق شمار کیا۔`,
      `حدیث میں امامت کے ساتھ آپ متقی فقیہ بھی تھے۔ الدارقطنی نے آپ کے بارے میں کہا: "ابو عبد الرحمٰن اپنے عہد کے ہر اُس شخص پر مقدم ہیں جسے اس علم میں ذکر کیا جاتا ہے۔"`,
      `عمر کے آخر میں آپ مصر سے دمشق گئے، وہاں معاویہ کے فضائل کے بارے میں پوچھا گیا تو آپ نے انکار کیا؛ آپ کو اذیت دی گئی یہاں تک کہ نکال دیے گئے، اور صفر 303ھ میں فلسطین — بعض نے کہا مکہ — میں وفات پائی، رحمہ اللہ۔`,
    ],
    source: `الذہبی، سیر أعلام النبلاء · ابن خلکان، وفیات الأعیان`,
    disputed: `آپ کی جائے وفات میں فلسطین کے الرملہ اور مکہ کے درمیان، اور اُس کے دن میں اختلاف ہے؛ مشہور 13 صفر 303ھ ہے۔`,
  },
  'bir-maouna': {
    year: `4ھ`,
    title: `بئرِ معونہ کا سانحہ`,
    summary: `عامر بن الطفیل اور اُس کے ساتھیوں نے صحابہ قرّاء میں سے اُن ستر افراد سے دغا کی جنہیں نبی کریم ﷺ نے اہلِ نجد کو قرآن سکھانے بھیجا تھا۔ ایک کے سوا سب شہید کر دیے گئے، اور نبی کریم ﷺ نے سخت غم منایا اور ایک ماہ اُن کے قاتلوں پر بددعا کی۔`,
    story: [
      `ابو براء عامر بن مالک نبی کریم ﷺ کے پاس آئے اور درخواست کی کہ آپ کچھ آدمی بھیجیں جو اہلِ نجد کو اسلام کی دعوت دیں، اور اُن کے لیے اپنی پناہ کی ضمانت دی۔ چنانچہ آپ ﷺ نے اپنے بہترین صحابہ میں سے ستر قرّاء بھیجے جو دن میں لکڑیاں چنتے اور رات میں قرآن کا مذاکرہ کرتے تھے۔`,
      `جب وہ بئرِ معونہ پر اترے تو عامر بن الطفیل نے اُن کے خلاف بنو سُلیم کے قبائل — عُصیہ، رِعل اور ذکوان — کو بھڑکا دیا، جنہوں نے قرّاء کو گھیر کر آخری فرد تک قتل کر دیا، سوائے کعب بن زید کے جو زخمی ہو کر مقتولین میں پڑے رہے، اور عمرو بن امیہ کے جو رہا کر دیے گئے۔`,
      `جب نبی کریم ﷺ کو خبر پہنچی تو آپ نے اُن پر ایسا غم منایا جو کسی سریہ پر نہ منایا تھا، اور فجر کی نماز میں پورا ایک ماہ رِعل، ذکوان اور عُصیہ پر قنوت کرتے رہے جنہوں نے اللہ اور اُس کے رسول کی نافرمانی کی، جیسا کہ صحیحین میں ثابت ہے۔`,
    ],
    source: `صحیح البخاری · ابن ہشام، السیرہ النبویہ`,
    disputed: `اہلِ سیر کے اتفاق سے یہ صفر 4ھ میں ہوا، اُس کے دن کی قطعی تعیین کے بغیر۔`,
  },
  'suleiman-death': {
    year: `974ھ`,
    title: `سلطان سلیمان القانونی کی وفات`,
    summary: `عثمانی سلطان سلیمان القانونی ہنگری میں قلعۂ سِگتوار کے محاصرے کے دوران اپنے خیمے میں وفات پا گئے، چھیالیس سال کی حکمرانی کے بعد جس میں عثمانی ریاست اپنے پھیلاؤ اور قوت کی بلندی کو پہنچی۔`,
    story: [
      `سلیمان اوّل 926ھ میں جوانی میں تختِ سلطنت پر بیٹھے، اور خود تیرہ بڑی مہمات کی قیادت کی، بلغراد، روڈس اور موہاچ کی مشہور فتح کے بعد بیشتر ہنگری فتح کیا، ویانا کا محاصرہ کیا، اور اُن کی سلطنت الجزائر سے عراق تک اور حجاز سے بلقان تک پھیلی۔`,
      `مغرب والوں نے اُنہیں "سلیمانِ عظیم" کہا، اور مسلمانوں نے اُنہیں "القانونی" کے نام سے جانا کیونکہ اُنہوں نے شریعت کے مطابق دواوین اور انتظامی قوانین کو منظم کیا۔ اُن کے دور میں معمار سنان نے فنِ تعمیر کے شاہکار بنائے، اور بیت المقدس کی وہ فصیلیں جو آج قائم ہیں تجدید کی گئیں۔`,
      `21 صفر 974ھ (ستمبر 1566ء) کی رات آپ سِگتوار کے محاصرے کے دوران اپنے خیمے میں وفات پا گئے جبکہ عمر ستر کے قریب تھی۔ صدرِ اعظم نے اُن کی وفات کی خبر قلعے کی فتح تک چھپائے رکھی، اور آپ استنبول میں اپنی مسجد "السلیمانیہ" میں دفن ہوئے۔`,
    ],
    source: `مصادرِ تاریخِ عثمانی (ابن إیاس اور مؤرخینِ دولتِ عثمانیہ)`,
  },
  'saladin-death': {
    year: `589ھ`,
    title: `سلطان صلاح الدین ایوبی کی وفات`,
    summary: `الناصر صلاح الدین یوسف بن ایوب — بیت المقدس کے آزاد کرانے والے اور حطین کے ہیرو — دمشق میں وفات پا گئے، اور مال میں صرف ایک دینار اور چالیس درہم چھوڑے۔ لوگ اُن پر اس طرح روئے جیسا اُن سے پہلے کسی بادشاہ پر نہ رویا گیا تھا۔`,
    story: [
      `صلاح الدین نے اپنی عمر صلیبیوں کے خلاف جہاد اور مصر و شام کو ایک پرچم تلے متحد کرنے میں گزاری، جس کی تکمیل حطین کی فتح اور 583ھ میں اکیانوے سال کے قبضے کے بعد بیت المقدس کی بازیابی سے ہوئی۔`,
      `صلحِ رملہ کے بعد جس نے تیسری صلیبی مہم کو ختم کیا، آپ تھکے ہارے دمشق لوٹے، پھر سخت بخار میں مبتلا ہوئے جس نے صرف چند دن کی مہلت دی۔ شیخ ابو جعفر آپ کے پاس قرآن پڑھ رہے تھے، جب "ھو اللہ الذی لا إلٰہ إلا ھو" پر پہنچے تو مؤرخین کہتے ہیں آپ کا چہرہ کھل اٹھا اور روح پرواز کر گئی۔`,
      `آپ 27 صفر 589ھ (مارچ 1193ء) کی بدھ کی صبح ستاون سال کی عمر میں وفات پا گئے، اور اپنے خزانے میں صرف ایک دینار اور چالیس درہم چھوڑے؛ کیونکہ آپ اپنا سب کچھ جہاد اور صدقات میں خرچ کر دیتے تھے۔ آپ دمشق میں جامع اموی کے پہلو میں دفن ہوئے اور آپ کی قبر آج تک زیارت گاہ ہے۔`,
    ],
    source: `ابن شداد، النوادر السلطانیہ · ابن خلکان، وفیات الأعیان`,
  },
  // ————————————————— ربیع الاول —————————————————
  'hijra-start': {
    year: `1ھ`,
    title: `آغازِ ہجرتِ نبوی: غارِ ثور کی طرف روانگی`,
    summary: `اللہ کی اجازت کے بعد نبی کریم ﷺ اور آپ کے ساتھی ابو بکر صدیق رضی اللہ عنہ مکہ سے خفیہ نکلے۔ تین راتیں غارِ ثور میں چھپے رہے جبکہ قریش اُنہیں تلاش کر رہے تھے، پھر ساحلی راستے سے مدینہ کی طرف روانہ ہوئے۔`,
    story: [
      `جب قریش کی ایذا شدید ہوئی اور دار الندوہ نے آپ ﷺ کو قتل کرنے کی سازش کی کہ ہر قبیلے کے جوان مل کر ایک ساتھ وار کریں، تو اللہ نے آپ کو ہجرت کی اجازت دی۔ آپ دوپہر کو نقاب پہنے ابو بکر کے پاس آئے اور فرمایا: "مجھے نکلنے کی اجازت دے دی گئی ہے۔"`,
      `علی بن ابی طالب رضی اللہ عنہ نبی کریم ﷺ کے بستر پر سوئے تاکہ گھات لگانے والوں کو دھوکہ ہو اور امانتیں اُن کے مالکوں کو لوٹا دیں۔ آپ ﷺ اور ابو بکر ابو بکر کے گھر کی ایک کھڑکی سے مکہ کے جنوب میں غارِ ثور کی طرف نکلے — مدینہ کے راستے کے برعکس — اور تین راتیں وہاں رہے۔`,
      `اللہ کے لطف کا یہ عالم تھا کہ مشرکین غار کے دہانے پر کھڑے ہو گئے، تو ابو بکر نے کہا: یا رسول اللہ! اگر اُن میں سے کوئی اپنے قدموں کے نیچے دیکھ لے تو ہمیں دیکھ لے۔ آپ ﷺ نے فرمایا: "اے ابو بکر! اُن دو کے بارے میں تمہارا کیا خیال ہے جن کا تیسرا اللہ ہے؟" اور اللہ نے نازل کیا: "غم نہ کرو، بے شک اللہ ہمارے ساتھ ہے۔"`,
    ],
    source: `صحیح البخاری · ابن ہشام، السیرہ النبویہ`,
    disputed: `مشہور یہ ہے کہ آپ ﷺ اواخرِ صفر یا اوائلِ ربیع الاول سنہ 1 میں مکہ سے نکلے؛ رات کی تعیین میں روایات مختلف ہیں۔`,
  },
  'granada-fall': {
    year: `897ھ`,
    title: `غرناطہ کا سقوط — اندلس کا آخری قلعہ`,
    summary: `بنو الاحمر کے آخری بادشاہ ابو عبد اللہ الصغیر نے غرناطہ اور قصرِ الحمراء کی چابیاں فرڈیننڈ اور ازابیلا کے حوالے کر دیں، یوں اندلس میں اسلامی تہذیب کی آٹھ صدیوں کا صفحہ لپٹ گیا۔`,
    story: [
      `قرطبہ اور اشبیلیہ کے سقوط کے بعد سلطنتِ غرناطہ ڈھائی صدیوں تک جزیرہ نمائے آئبیریا میں اسلام کا آخری قلعہ رہی، یہاں تک کہ فرڈیننڈ اور ازابیلا کی شادی سے قشتالہ اور اراغون کی سلطنتیں متحد ہو گئیں، اور بنو الاحمر کے داخلی اختلافات نے اسے کمزور کر دیا۔`,
      `ہسپانویوں نے مہینوں غرناطہ کا محاصرہ کیا یہاں تک کہ بھوک نے اسے جکڑ لیا، تو ابو عبد اللہ محمد ثانی عشر (الصغیر) نے معاہدۂ تسلیم پر دستخط کیے جس میں مسلمانوں کی جان، دین اور مال کی امان طے تھی — مگر یہ عہد جلد ہی محاکمِ تفتیش اور جبری تنصیر سے توڑ دیے گئے۔`,
      `2 ربیع الاول 897ھ (2 جنوری 1492ء) کو دونوں کیتھولک بادشاہ شہر میں داخل ہوئے اور الحمراء پر صلیب بلند کی گئی۔ ابو عبد اللہ شہر پر نظر ڈالتی ایک بلندی پر رک کر رونے لگے، تو اُن کی ماں عائشہ نے اپنا مشہور جملہ کہا: "اُس بادشاہت پر عورتوں کی طرح رو جسے تو مردوں کی طرح محفوظ نہ رکھ سکا۔"`,
    ],
    source: `المقّری، نفح الطیب من غصن الأندلس الرطیب`,
  },
  'mehmed-fatih-death': {
    year: `886ھ`,
    title: `سلطان محمد الفاتح کی وفات`,
    summary: `عثمانی سلطان محمد ثانی، فاتحِ قسطنطنیہ، اُنچاس سال کی عمر میں ایک نئی مہم کی طرف جاتے ہوئے وفات پا گئے جس کی سمت اُنہوں نے چھپا رکھی تھی، اس کے بعد کہ روم کے دار الحکومت کو فتح کر کے تاریخ کا رخ بدل چکے تھے۔`,
    story: [
      `محمد ثانی اکیس سال کی جوانی میں تختِ سلطنت پر بیٹھے، اور جلد ہی وہ خواب پورا کیا جو مسلمانوں کو آٹھ صدیوں سے تھا — 857ھ میں قسطنطنیہ کی فتح۔ آپ "الفاتح" کے لقب سے پکارے گئے اور یہ شہر اُن کی سلطنت کا دار الحکومت بنا۔`,
      `فتح کے بعد آپ نہ رکے؛ سربیا، موریہ، بوسنیا، طرابزون اور کریمیا کو ملایا، اپنے مشہور "قانون نامہ" سے ریاست کو منظم کیا، اور اس کے ساتھ علم و علماء سے محبت رکھتے تھے، کئی زبانیں جانتے تھے، اور اپنے مجلس میں فقہاء، فلاسفہ اور شعراء کو جمع کرتے تھے۔`,
      `4 ربیع الاول 886ھ (مئی 1481ء) کو آپ اسکدار کے قریب اپنے لشکر گاہ میں ایک بڑی مہم کی تیاری کے دوران وفات پا گئے جس کی منزل اپنے قریب ترین لوگوں سے بھی چھپائے رکھی — کہا جاتا ہے آپ اٹلی کا ارادہ رکھتے تھے — اور استنبول میں جامع الفاتح میں دفن ہوئے۔`,
    ],
    source: `مصادرِ تاریخِ عثمانی · ابن إیاس، بدائع الزہور`,
  },
  'quba-arrival': {
    year: `1ھ`,
    title: `نبی کریم ﷺ کی قباء آمد اور پہلی مسجد کی بنیاد`,
    summary: `ہجرت کا مبارک سفر نبی کریم ﷺ اور آپ کے ساتھی کی مدینہ کے مضافات میں قباء آمد پر ختم ہوا، جہاں آپ بنو عمرو بن عوف میں اترے اور مسجدِ قباء کی بنیاد رکھی — اسلام میں تقویٰ پر بنی جانے والی پہلی مسجد۔`,
    story: [
      `اہلِ یثرب ہر صبح حَرّہ کی طرف نکل کر ہجرت کے قافلے کا انتظار کرتے یہاں تک کہ دھوپ کی تپش اُنہیں لوٹا دیتی۔ جب قافلہ نمودار ہوا تو ایک یہودی نے چڑھ کر پکارا: اے بنو قیلہ! یہ تمہارے وہ بزرگ ہیں جن کا تم انتظار کر رہے ہو! تو مسلمان خوشی اور استقبال میں ہتھیار اٹھا کر اٹھ کھڑے ہوئے۔`,
      `آپ ﷺ قباء میں بنو عمرو بن عوف میں کلثوم بن الہدم کے ہاں اترے، اور وہاں چند راتیں قیام کیا جن میں مسجدِ قباء کی بنیاد رکھی جس کے بارے میں اللہ نے فرمایا: "البتہ جو مسجد پہلے دن سے تقویٰ پر بنائی گئی وہ زیادہ حق دار ہے کہ تم اُس میں کھڑے ہو۔" آپ اپنے دستِ مبارک سے اُس کی تعمیر میں کام کرتے تھے۔`,
      `پھر آپ جمعہ کے دن مدینہ کی طرف سوار ہوئے، تو نماز نے آپ کو بنو سالم میں پا لیا، وہاں آپ نے پہلا جمعہ پڑھایا، اور مدینہ میں داخل ہوئے جبکہ لوگ کہہ رہے تھے: اللہ کے نبی آ گئے! آپ کی آمد کا دن اس کی تاریخ کا روشن ترین دن تھا، اور سنِ ہجرت امت کی تاریخ کا مبدأ بن گیا۔`,
    ],
    source: `ابن ہشام، السیرہ النبویہ · صحیح البخاری (بابِ ہجرتِ نبی ﷺ)`,
    disputed: `مشہور یہ ہے کہ آپ پیر 8 ربیع الاول کو قباء پہنچے اور جمعہ 12 کو مدینہ داخل ہوئے؛ روایات میں 8 اور 12 کے درمیان اختلاف ہے۔`,
  },
  'mawlid': {
    year: `عامُ الفیل`,
    title: `نبی کریم محمد ﷺ کی ولادت`,
    summary: `سیدِ اولادِ آدم محمد بن عبد اللہ ﷺ مکہ میں عامُ الفیل میں، ربیع الاول کے پیر کے دن، یتیمُ الاب، عرب کے شریف ترین گھرانے بنو ہاشم میں پیدا ہوئے — آپ کی ولادت بنی نوعِ انسان کے لیے ایک نئی تاریخ کی صبح تھی۔`,
    story: [
      `آپ ﷺ عامُ الفیل میں پیدا ہوئے — وہ سال جس میں اللہ نے اصحابِ فیل کو ہلاک کیا جو کعبہ گرانے آئے تھے۔ آپ کی ولادت سے پہلے آپ کے والد عبد اللہ کا انتقال ہو گیا، تو آپ کے دادا عبد المطلب پھر چچا ابو طالب نے آپ کی کفالت کی، اور حلیمہ سعدیہ نے بنو سعد کے بادیہ میں آپ کو دودھ پلایا۔`,
      `آپ ﷺ سے صحیح ثابت ہے کہ جب پیر کے روزے کے بارے میں پوچھا گیا تو فرمایا: "یہ وہ دن ہے جس میں میری ولادت ہوئی اور جس میں مجھے مبعوث کیا گیا — یا مجھ پر وحی نازل ہوئی۔" پس بلا اختلاف ثابت ہے کہ آپ کی ولادت پیر کے دن ہوئی۔`,
      `آپ ﷺ مکہ میں صادق و امین کے نام سے پروان چڑھے، یہاں تک کہ اللہ نے آپ کو چالیس سال کی عمر پر عالمین کے لیے رحمت بنا کر مبعوث کیا۔ آپ نے لوگوں کو اندھیروں سے نکال کر نور کی طرف لایا، اور اپنی امت کو ایسی روشن شاہراہ پر چھوڑا جس کی رات اس کے دن کی مانند ہے۔`,
    ],
    source: `ابن ہشام، السیرہ النبویہ · صحیح مسلم (پیر کا روزہ) · ابن کثیر، البدایہ والنہایہ`,
    disputed: `اس پر اتفاق ہے کہ آپ عامُ الفیل کے ربیع الاول میں پیر کے دن پیدا ہوئے؛ دن میں اختلاف ہے: 2، 8، 9 اور 12 مروی ہیں، جمہور کے نزدیک مشہور 12 ربیع الاول ہے، جبکہ بعض معاصر اہلِ فلک نے 9 ربیع الاول کو ترجیح دی ہے۔`,
  },
  'prophet-death': {
    year: `11ھ`,
    title: `نبی کریم محمد ﷺ کی وفات`,
    summary: `رسول اللہ ﷺ پیر 12 ربیع الاول 11ھ کی چاشت کے وقت عائشہ رضی اللہ عنہا کے گھر میں رفیقِ اعلیٰ سے جا ملے، اس کے بعد کہ اللہ نے آپ کے ذریعے دین مکمل کیا اور نعمت پوری کی — یہ امت پر نازل ہونے والی سب سے بڑی مصیبت تھی۔`,
    story: [
      `رسول اللہ ﷺ پر چند دن مرض شدید رہا، تو آپ نے ابو بکر کو لوگوں کی امامت کا حکم دیا، پھر پیر کی صبح عائشہ کے حجرے سے اُن پر جھانکا جبکہ لوگ فجر کی نماز میں صف بستہ تھے، تو آپ مسکرائے۔ اُنہوں نے گمان کیا کہ آپ اُن کی طرف نکل رہے ہیں، پھر آپ نے پردہ گرا دیا اور اُسی دن چاشت کے وقت وفات پا گئے۔`,
      `مسلمان مضطرب ہو گئے یہاں تک کہ عمر نے کہا: رسول اللہ کی وفات نہیں ہوئی! تو ابو بکر خطیب بن کر کھڑے ہوئے اور اپنا لازوال جملہ کہا: "جو محمد کی عبادت کرتا تھا تو محمد وفات پا گئے، اور جو اللہ کی عبادت کرتا تھا تو اللہ زندہ ہے، مرتا نہیں"، اور تلاوت کی: "اور محمد تو صرف ایک رسول ہیں، اُن سے پہلے بہت سے رسول گزر چکے ہیں۔"`,
      `انصار سقیفہ بنو ساعدہ میں جمع ہوئے، تو مسلمانوں نے ابو بکر صدیق کی خلافت پر بیعت کی، اور آپ ﷺ کو غسل دے کر بدھ کی رات عائشہ کے حجرے میں وہیں دفن کیا گیا جہاں آپ کی وفات ہوئی، آپ کی عمر تریسٹھ سال تھی، صلوات اللہ و سلامہ علیہ۔`,
    ],
    source: `صحیح البخاری · ابن ہشام، السیرہ النبویہ`,
    disputed: `اس میں اختلاف نہیں کہ آپ ربیع الاول 11ھ کے پیر کو وفات پائے، مشہور 12 ہے، اور حجۃ الوداع کے وقوفِ عرفہ کے ایک حسابی اشکال کی بنا پر 2 ربیع الاول بھی کہا گیا۔`,
  },
  'imam-ahmad-death': {
    year: `241ھ`,
    title: `امام احمد بن حنبل کی وفات`,
    summary: `اہلِ سنت کے امام احمد بن حنبل — صاحبِ مسند اور فتنۂ خلقِ قرآن کے ہیرو جو اُس وقت ثابت قدم رہے جب لوگ ڈگمگا گئے — بغداد میں وفات پا گئے، اور اُن کے جنازے میں ایسی خلق شریک ہوئی جس کی مثال بغداد کی تاریخ میں نہ تھی۔`,
    story: [
      `امام احمد 164ھ میں پیدا ہوئے اور بغداد میں یتیم پروان چڑھے۔ طلبِ حدیث میں شہروں کی طرف سفر کیا اور "المسند" کو قریباً تیس ہزار احادیث میں جمع کیا۔ امام شافعی نے اُن کے بارے میں کہا: "میں بغداد سے نکلا تو وہاں احمد بن حنبل سے بڑھ کر کوئی فقیہ اور پرہیزگار نہ چھوڑا۔"`,
      `مامون، معتصم اور واثق کے عہد میں خلقِ قرآن کے قول کے فتنے میں آپ آزمائے گئے، تو قید کیے گئے اور کوڑوں سے مارے گئے یہاں تک کہ بے ہوش ہو جاتے، مگر آپ اپنے قول پر ثابت رہے: قرآن اللہ کا کلام ہے، غیر مخلوق۔ اللہ نے آپ کے ذریعے امت کا عقیدہ محفوظ رکھا اور لوگوں نے آپ کو "امامِ اہلِ سنت" کہا۔`,
      `آپ جمعہ 12 ربیع الاول 241ھ کی چاشت کو وفات پا گئے، تو بغداد نے اپنے بازار بند کر دیے، اور آپ کے جنازے کا اندازہ لاکھوں میں لگایا گیا، جس کی مثال پہلے نہ دیکھی گئی، یہاں تک کہ کہا گیا: اہلِ بدعت سے کہو، ہمارے اور تمہارے درمیان جنازوں کا دن ہے۔`,
    ],
    source: `الذہبی، سیر أعلام النبلاء · ابن الجوزی، مناقب الإمام أحمد`,
  },
  'imam-malik-death': {
    year: `179ھ`,
    title: `امام مالک بن انس کی وفات`,
    summary: `امامِ دار الہجرت مالک بن انس، صاحبِ "الموطأ"، مدینہ منورہ میں وفات پا گئے۔ مدینہ میں فقہ و حدیث کی امامت آپ پر منتہی ہوئی، اور مالکی — چار مذاہب میں سے ایک — آپ ہی کی طرف منسوب ہے۔`,
    story: [
      `مالک مدینہ میں قریباً 93ھ میں پیدا ہوئے، اور نافع مولیٰ ابن عمر اور ابن شہاب زہری وغیرہ سے علم حاصل کیا، یہاں تک کہ مدینہ کے وہ عَلَم بن گئے جن کی طرف اونٹوں کے جگر مارے جاتے (لوگ دور دور سے آتے)، اور اُن کے بارے میں کہا گیا: "مالک کے مدینہ میں ہوتے کوئی فتویٰ نہیں دیتا۔"`,
      `آپ نے سخت احتیاط سے "الموطأ" مرتب کی، جسے ایک لاکھ احادیث سے منتخب کیا اور چالیس سال تک اس کی تہذیب کرتے رہے۔ امام شافعی نے کہا: "کتاب اللہ کے بعد مالک کی موطأ سے زیادہ صحیح کوئی کتاب نہیں۔"`,
      `آپ باوقار اور پُرہیبت تھے، رسول اللہ ﷺ کی حدیث کی اتنی تعظیم کرتے کہ صرف باوضو اور سکون کے ساتھ حدیث بیان کرتے۔ آپ مدینہ میں 179ھ میں وفات پا گئے اور بقیع میں دفن ہوئے، اور آج آپ کا مذہب مغربِ عربی، مغربی افریقہ اور خلیج کے کچھ حصوں کا مذہب ہے۔`,
    ],
    source: `الذہبی، سیر أعلام النبلاء · ابن خلکان، وفیات الأعیان`,
    disputed: `مشہور یہ ہے کہ آپ ربیع الاول 179ھ میں وفات پائے؛ بعض نے صفر کہا؛ اور دن میں مشہور روایات 11 اور 14 ربیع الاول ہیں۔`,
  },
  'masjid-nabawi-founding': {
    year: `1ھ`,
    title: `مسجدِ نبوی شریف کی بنیاد`,
    summary: `نبی کریم ﷺ کے مدینہ داخل ہونے کے بعد آپ کی اونٹنی دو یتیم لڑکوں کے کھلیان کی جگہ بیٹھ گئی، تو آپ ﷺ نے وہ خرید کر اُس میں اپنی مسجدِ شریف اور حجرے بنائے، اور اُس کی تعمیر میں اپنے صحابہ کے ساتھ اپنے دستِ مبارک سے کام کیا۔`,
    story: [
      `جب نبی کریم ﷺ مدینہ داخل ہوئے تو انصار آپ کی اونٹنی کی نکیل تھامنے لگے، ہر ایک آپ کو مہمان بنانا چاہتا تھا، تو آپ نے فرمایا: "اسے چھوڑ دو، یہ مامور ہے"، یہاں تک کہ وہ بنو نجار کے دو یتیم لڑکوں سہل اور سہیل کے کھلیان کی جگہ بیٹھ گئی۔ آپ نے وہ اُن سے خریدی اور تعمیر مکمل ہونے تک ابو ایوب انصاری کے ہاں قیام کیا۔`,
      `مسجد کچی اینٹوں سے بنائی گئی، اُس کی چھت کھجور کی شاخوں سے اور ستون کھجور کے تنوں سے تھے۔ آپ ﷺ نے خود اُس میں کام کیا، اپنے صحابہ کے ساتھ اینٹیں ڈھوتے تھے اور وہ یہ اشعار پڑھتے: "اے اللہ! آخرت کی زندگی کے سوا کوئی زندگی نہیں، پس انصار اور مہاجرین کو بخش دے۔"`,
      `مسجدِ نبوی نئی ریاست کا دل بن گئی: اُس میں نماز، وحی و علم کی مجالس، جھنڈوں کا باندھنا اور وفود کا استقبال ہوتا۔ آپ ﷺ نے فرمایا: "میری اِس مسجد میں ایک نماز اُس کے سوا ہزار نمازوں سے بہتر ہے، سوائے مسجدِ حرام کے۔"`,
    ],
    source: `ابن ہشام، السیرہ النبویہ · صحیح البخاری`,
    disputed: `تعمیر کا آغاز آپ ﷺ کی مدینہ آمد کے بعد سنہ 1 کے ربیع الاول میں ہوا؛ مصادر نے آغاز کا مخصوص دن ضبط نہیں کیا۔`,
  },

  // ————————————————— ربیع الثانی —————————————————
  'jilani-death': {
    year: `561ھ`,
    title: `شیخ عبد القادر جیلانی کی وفات`,
    summary: `حنبلی شیخ عبد القادر جیلانی — واعظ و زاہد جن کے ذکر نے آفاق کو بھر دیا اور جن کی مجالسِ وعظ سے بے شمار لوگوں نے فائدہ اٹھایا — بغداد میں وفات پا گئے۔ اُنہی کی طرف قادری طریقہ منسوب ہے۔`,
    story: [
      `عبد القادر بحرِ قزوین کے قریب جیلان میں قریباً 470ھ میں پیدا ہوئے، اور جوانی میں فقیر حالت میں بغداد آئے۔ امام احمد کے مذہب پر فقہ اور حدیث و ادب حاصل کیا، پھر برسوں زہد و مجاہدہ اختیار کیا۔`,
      `آپ وعظ کے لیے بیٹھے تو آپ کی مجلس میں ہزاروں جمع ہوتے، آپ کے ہاتھ پر بہت سے لوگ اسلام لائے اور توبہ کی، اور آپ نے اپنے مشہور مدرسے میں فقہ، تفسیر اور حدیث پڑھائی۔ آپ کی کتابوں میں "الغنیہ لطالبی طریق الحق" اور "فتوح الغیب" ہیں۔`,
      `آپ بغداد میں 561ھ میں قریباً نوے سال کی عمر میں وفات پا گئے اور اپنے مدرسے میں دفن ہوئے۔ الذہبی نے کہا: "شیخ عبد القادر عظیم القدر ہیں، مگر اُن کی وفات کے بعد اُن کی طرف ایسی حکایات منسوب کی گئیں جو صحیح نہیں" — پس اُن کا حق غلو کے بغیر توقیر ہے۔`,
    ],
    source: `الذہبی، سیر أعلام النبلاء · ابن رجب، ذیل طبقات الحنابلہ`,
    disputed: `مشہور یہ ہے کہ آپ 8 ربیع الثانی 561ھ کو وفات پائے؛ بعض نے 11 کہا۔`,
  },
  'abbasid-bayah-saffah': {
    year: `132ھ`,
    title: `عباسی ریاست کا قیام اور السفّاح کی بیعت`,
    summary: `ابو العباس عبد اللہ بن محمد، ملقب بہ السفّاح، کی خلافت پر مسجدِ کوفہ میں بیعت ہوئی — اور اسی کے ساتھ عباسی ریاست قائم ہوئی جس نے پانچ صدیوں سے زیادہ عالمِ اسلام پر حکومت کی۔`,
    story: [
      `عباسی دعوت "الرضا من آل محمد" کے نام سے خراسان سے خفیہ شروع ہوئی، اور ابو مسلم خراسانی نے اس کی قیادت کی یہاں تک کہ اموی لشکر اس کے سامنے ڈھے گئے، اور عباسی 132ھ میں کوفہ میں داخل ہوئے۔`,
      `مسجدِ کوفہ کے جامع میں ابو العباس منبر پر چڑھے، لوگوں نے اُن کی خلافت پر بیعت کی، اور اُنہوں نے اپنا مشہور خطبہ دیا جس میں خود کو "السفّاح" کا نام دیا، ایک نئے دور اور ایسی ریاست کے آغاز کا اعلان کرتے ہوئے جس نے کالا پرچم اپنا شعار بنایا۔`,
      `چند ہی مہینے گزرے کہ معرکۂ زاب میں اموی ریاست ختم ہو گئی، اور بنو عباس کی ریاست مستحکم ہوئی جو دار الحکومت بغداد منتقل کرے گی اور اپنے عہدِ زریں میں علم و عمران میں اسلامی تہذیب کے شاندار ترین ادوار دیکھے گی۔`,
    ],
    source: `الطبری، تاریخ الرسل والملوک · ابن الأثیر، الکامل فی التاریخ`,
    disputed: `مشہور یہ ہے کہ عام بیعت 12 ربیع الثانی 132ھ کو ہوئی؛ بعض روایات میں 13، اور بعض نے ربیع الاول کہا۔`,
  },
  'hattin': {
    year: `583ھ`,
    title: `معرکۂ حطّین`,
    summary: `صلاح الدین ایوبی نے طبریہ کے قریب قرونِ حطّین کے پاس صلیبی لشکر کو کچل دیا، اور بیت المقدس کے بادشاہ اور بڑے سرداروں کو قید کر لیا۔ اس فتح نے چند ماہ بعد قدس کی بازیابی کا راستہ کھول دیا۔`,
    story: [
      `صلاح الدین نے مصر، شام اور جزیرہ سے قریباً تیس ہزار کی فوج جمع کی، اور طبریہ پر حملہ کر کے صلیبی لشکر کو صفوریہ کے محفوظ لشکر گاہ سے تپتے جولائی میں پیاسی پہاڑیوں کے پار نکلنے پر آمادہ کیا۔`,
      `مسلمانوں نے قرونِ حطّین کی ٹیکریوں کے پاس پیاس سے نڈھال صلیبیوں کو گھیر لیا، اور اُن کے گرد گھاس میں آگ لگا دی۔ جب ہفتہ 25 ربیع الثانی 583ھ (4 جولائی 1187ء) کو معرکہ ختم ہوا تو صلیبی لشکر مقتول اور قیدی کے درمیان فنا ہو چکا تھا۔`,
      `بادشاہ گی دی لوزینیان قید ہوا اور کرک کا مالک عہد شکن ارناط پکڑا گیا — صلاح الدین نے اپنے نذر کو پورا کرتے ہوئے اسے اپنے ہاتھ سے قتل کیا۔ اس کے بعد ساحل قلعہ بہ قلعہ گرتا گیا، یہاں تک کہ صلاح الدین اُسی سال رجب میں قدس میں داخل ہوئے۔`,
    ],
    source: `ابن الأثیر، الکامل فی التاریخ · ابن شداد، النوادر السلطانیہ`,
    disputed: `بڑا معرکہ ہفتہ 25 ربیع الثانی کو ہوا؛ اُس کے مقدمات 24 کو تھے، اسی لیے بعض مصادر دونوں دن ذکر کرتے ہیں۔`,
  },
  // ————————————————— جمادی الاول —————————————————
  'bayhaqi-death': {
    year: `458ھ`,
    title: `امام بیہقی کی وفات`,
    summary: `حافظ ابو بکر احمد بن الحسین البیہقی — صاحبِ "السنن الکبریٰ" اور "شعب الإیمان"، اور اُن عظیم ترین لوگوں میں سے جنہوں نے تصنیف کے ذریعے حدیثِ نبوی اور فقہِ شافعی کی خدمت کی — نیشاپور میں وفات پا گئے۔`,
    story: [
      `بیہقی 384ھ میں نیشاپور کے قریب بیہق کے گاؤں خسروجرد میں پیدا ہوئے۔ اُنہوں نے صاحبِ "المستدرک" حاکم اور اُن کے طبقے سے سماع کیا، اور حفظ، فقہ اور اصول کو جمع کیا یہاں تک کہ اپنے عہد کے اعلام میں شمار ہوئے۔`,
      `اُنہوں نے قریباً ایک ہزار جزء تصنیف کیے، جن میں سب سے مشہور "السنن الکبریٰ" ہے جس کے بارے میں اہلِ علم نے کہا: اس جیسی کسی کی نہیں، نیز "دلائل النبوہ"، "شعب الإیمان" اور "معرفہ السنن والآثار"۔ کہا گیا: اگر بیہقی نہ ہوتے تو شافعی کا مذہب کتابوں کے پیٹ میں بکھرا رہتا۔`,
      `امام الحرمین جوینی نے کہا: "ہر شافعی پر شافعی کا احسان ہے، سوائے بیہقی کے کہ اُن کا شافعی پر احسان ہے۔" آپ نیشاپور میں 10 جمادی الاول 458ھ کو وفات پا گئے اور اپنے شہر بیہق منتقل کر کے وہیں دفن ہوئے۔`,
    ],
    source: `الذہبی، سیر أعلام النبلاء · السبکی، طبقات الشافعیہ الکبریٰ`,
  },
  'mutah': {
    year: `8ھ`,
    title: `غزوۂ مؤتہ`,
    summary: `تین ہزار مسلمان سرزمینِ شام میں مؤتہ کے مقام پر روم اور اُن کے حلیفوں کے جتھوں سے ٹکرائے، تو تینوں امیر زید بن حارثہ، جعفر بن ابی طالب اور عبد اللہ بن رواحہ شہید ہوئے، اور خالد بن الولید نے ماہرانہ انسحاب سے لشکر کو بچا لیا۔`,
    story: [
      `نبی کریم ﷺ نے حارث بن عمیر کو بصریٰ کے حاکم کی طرف قاصد بھیجا تو شرحبیل غسانی نے اُنہیں قتل کر دیا — رسول اللہ ﷺ کا اِن کے سوا کوئی قاصد قتل نہ ہوا — تو آپ نے تین ہزار کا لشکر تیار کیا اور زید بن حارثہ کو امیر بنایا، اگر وہ شہید ہوں تو جعفر، اگر وہ شہید ہوں تو ابن رواحہ۔`,
      `مسلمانوں کو روم اور اُن کے عرب حلیفوں کے لاکھوں کے جتھوں کا سامنا ہوا، تو وہ مؤتہ کی طرف بڑھے اور حیرت انگیز جنگ کی؛ تینوں امیر یکے بعد دیگرے شہید ہوئے، اور جعفر کے دونوں ہاتھ کٹ گئے جبکہ وہ جھنڈا تھامے تھے یہاں تک کہ اُسے سینے سے لگا لیا — تو "ذو الجناحین" کہلائے۔`,
      `خالد بن الولید نے جھنڈا اٹھایا اور ایک شاندار چال سے لشکر کو الگ کر کے فنا سے بچا لیا۔ نبی کریم ﷺ نے خبر پہنچنے سے پہلے مدینہ میں اپنے صحابہ کو شہداء کی خبر دی، آپ کی آنکھیں بہہ رہی تھیں، اور خالد کے بارے میں فرمایا: "اللہ کی تلواروں میں سے ایک تلوار۔"`,
    ],
    source: `صحیح البخاری · ابن ہشام، السیرہ النبویہ`,
    disputed: `اہلِ سیر کے اتفاق سے یہ جمادی الاول 8ھ میں ہوا؛ اُس کے دن کی تعیین ثابت نہیں۔`,
  },
  'suyuti-death': {
    year: `911ھ`,
    title: `امام جلال الدین سیوطی کی وفات`,
    summary: `حافظ جلال الدین سیوطی — جن کی تصانیف تفسیر، حدیث، لغت اور تاریخ میں چھ سو سے تجاوز کر گئیں، اور جن میں "الإتقان"، "الجامع الصغیر" اور "تفسیر الجلالین" ہیں — قاہرہ میں وفات پا گئے۔`,
    story: [
      `سیوطی 849ھ میں پیدا ہوئے اور قاہرہ میں یتیم پروان چڑھے۔ آٹھ سال سے پہلے قرآن حفظ کیا، اور طلبِ علم میں یہاں تک پہنچے کہ اپنے بارے میں کہا: مجھے سات علوم میں تبحر عطا ہوا، اور بیس سال کی عمر میں فتویٰ دیا اور پڑھایا۔`,
      `اُنہوں نے چھ سو سے زائد تصانیف — کتاب و رسالہ — لکھیں، جن میں "الإتقان فی علوم القرآن"، "الدر المنثور"، "تدریب الراوی"، "تاریخ الخلفاء" اور "المزہر" ہیں، اور "تفسیر الجلالین" مکمل کیا جسے اُن کے استاد جلال الدین محلی نے شروع کیا تھا۔`,
      `عمر کے آخر میں آپ نیل کے جزیرے میں روضۃ المقیاس میں لوگوں سے کنارہ کش ہو کر تصنیف و عبادت کرتے رہے، اور عطیات و مناصب کو ٹھکرایا، یہاں تک کہ 19 جمادی الاول 911ھ کو وفات پائی اور قاہرہ میں بابِ قرافہ کے باہر حوشِ قوصون میں دفن ہوئے۔`,
    ],
    source: `الشوکانی، البدر الطالع · نجم الدین الغزی، الکواکب السائرہ`,
  },
  'constantinople-conquest': {
    year: `857ھ`,
    title: `فتحِ قسطنطنیہ`,
    summary: `سلطان محمد ثانی چون دن کے محاصرے کے بعد قسطنطنیہ میں داخل ہوئے، تو بازنطینی سلطنت کا وہ دار الحکومت گر گیا جو آٹھ صدیوں تک فاتحین کے سامنے ناقابلِ تسخیر رہا، اور نبوی بشارت پوری ہوئی۔`,
    story: [
      `محمد ثانی نے قریباً پونے دو لاکھ سپاہی اور ایسی دیو ہیکل توپیں جمع کیں جن کی مثال تاریخ نے نہ دیکھی تھی — جن میں سب سے مشہور سلطانی توپ تھی جسے اوربان نے ڈھالا — اور دنیا کی عظیم ترین فصیلوں سے محفوظ شہر کا 26 ربیع الاول 857ھ کو محاصرہ کیا۔`,
      `جب بازنطینیوں نے قرنِ ذہبی (گولڈن ہارن) کو زنجیروں سے بند کر دیا تو سلطان نے حکم دیا کہ کشتیوں کو چربی لگے تختوں پر ایک ہی رات میں پہاڑیوں کے پار کھینچا جائے، تو ستر کشتیاں خلیج کے قلب میں آ گئیں — یہ تاریخ کی حیرت انگیز ترین جنگی چالوں میں سے ہے۔`,
      `منگل 20 جمادی الاول 857ھ (29 مئی 1453ء) کی صبح عثمانیوں نے فصیلوں کو عبور کیا، بادشاہ قسطنطین مارا گیا، اور نوجوان سلطان — جن کی عمر بائیس سال تھی — شہر میں داخل ہوئے تو "الفاتح" کہلائے، اور لوگوں نے یہ حدیث یاد کی: "قسطنطنیہ ضرور فتح ہوگا، تو اُس کا امیر کیا ہی اچھا امیر ہے اور وہ لشکر کیا ہی اچھا لشکر ہے۔"`,
    ],
    source: `مصادرِ تاریخِ عثمانی و بازنطینی · مسند الإمام أحمد (حدیثِ بشارت)`,
  },
  'ajnadayn': {
    year: `13ھ`,
    title: `معرکۂ اجنادین`,
    summary: `خالد بن الولید کی قیادت میں مسلمانوں نے فلسطین کے اجنادین میں روم کے جتھوں کو شکست دی، ہرقل کے لشکروں سے پہلی بڑی مڈبھیڑ میں، جس نے پورے شام کی فتوحات کا راستہ کھول دیا۔`,
    story: [
      `جب اہلِ شام کے سرداروں نے روم کے جتھوں کے سامنے ابو بکر صدیق رضی اللہ عنہ سے مدد مانگی، تو آپ نے خالد بن الولید کو عراق سے کوچ کا حکم دیا۔ خالد نے ایک برق رفتار لازوال سفر میں بادیۂ سماوہ کو عبور کیا اور مجتمع لشکروں کی قیادت سنبھالی۔`,
      `دونوں لشکر الرملہ اور بیت جبرین کے درمیان اجنادین میں ٹکرائے، اور روم دسیوں ہزار میں تھے، مگر مسلمانوں نے صبر اور خوب جوانمردی دکھائی یہاں تک کہ روم کو بری شکست ہوئی، اور بہترین صحابہ میں سے کچھ شہید ہوئے۔`,
      `اجنادین شام کی کنجی تھی؛ کیونکہ اس نے فلسطین میں روم کی شوکت توڑ دی، اور اس کے بعد یرموک، پھر فتحِ دمشق اور بیت المقدس آئے۔ بشارت ابو بکر کو اُن کے مرضِ وفات میں پہنچی تو آپ خوش ہوئے۔`,
    ],
    source: `الطبری، تاریخ الرسل والملوک · البلاذری، فتوح البلدان`,
    disputed: `مشہور یہ ہے کہ یہ جمادی الاول 13ھ میں ہوا؛ بعض نے جمادی الآخرہ کہا۔ اُس کے دن میں اختلاف ہے، اور بعض نے 28 جمادی الاول ذکر کیا۔`,
  },

  // ————————————————— جمادی الثانی —————————————————
  'harun-rashid-death': {
    year: `193ھ`,
    title: `خلیفہ ہارون الرشید کی وفات`,
    summary: `عباسی خلیفہ ہارون الرشید ایک بغاوت کو کچلنے جاتے ہوئے خراسان کے طوس میں وفات پا گئے، تئیس سال کی حکمرانی کے بعد جس میں عباسی ریاست اپنی قوت اور خوشحالی کے عروج کو پہنچی۔`,
    story: [
      `ہارون الرشید نے 170ھ میں جوانی میں خلافت سنبھالی، اور اُن کا عہد عصرِ زریں کے عروج کا گواہ بنا: بغداد دنیا کا عظیم ترین شہر، بیت الحکمہ اقوام کے علوم کا ترجمہ کرتا، اور مال یوں بہتا کہ کہا گیا آپ بادل سے خطاب کرتے: جہاں چاہے برس، تیرا خراج میرے پاس آئے گا۔`,
      `اس کے ساتھ آپ کثرت سے غزوہ و حج کرتے؛ روایت ہے کہ آپ ایک سال حج کرتے اور ایک سال غزوہ، اور خود کئی بار روم پر حملہ کیا۔ زمین کے بادشاہ آپ سے ڈرتے تھے یہاں تک کہ آپ کی شہرت آفاق میں پھیلی اور آپ کا نام "ہزار داستان (الف لیلہ ولیلہ)" کے ادب میں داخل ہوا۔`,
      `آپ خود رافع بن الليث کی بغاوت کو کچلنے ماوراء النہر نکلے جبکہ بیمار تھے، تو مرض طوس میں شدید ہوا اور وہاں جمادی الثانی 193ھ میں قریباً پینتالیس سال کی عمر میں وفات پائی، اور وہیں دفن ہوئے۔ اُن کی وفات سے اُن کے دو بیٹوں امین اور مامون کے درمیان فتنہ شروع ہوا۔`,
    ],
    source: `الطبری، تاریخ الرسل والملوک · الذہبی، سیر أعلام النبلاء`,
    disputed: `آپ جمادی الثانی 193ھ میں وفات پائے، مشہور یہ کہ اس کی تیسری تاریخ کی ہفتہ کی رات؛ بعض مصادر میں دن میں معمولی اختلاف ہے۔`,
  },
  'battle-of-jamal': {
    year: `36ھ`,
    title: `وقعۂ جمل`,
    summary: `بصرہ میں خلیفہ علی بن ابی طالب کے لشکر اور عائشہ، طلحہ اور زبیر رضی اللہ عنہم کے لشکر کے درمیان دردناک مڈبھیڑ ہوئی — مسلمانوں کے درمیان پہلا قتال — جو طلحہ اور زبیر کی شہادت اور عائشہ کی باعزت واپسی پر ختم ہوئی۔`,
    story: [
      `عثمان رضی اللہ عنہ کی شہادت اور علی کی بیعت کے بعد ام المؤمنین عائشہ طلحہ اور زبیر کے ساتھ عثمان کے قاتلوں سے قصاص کا مطالبہ کرتے ہوئے بصرہ نکلیں، اور دونوں فریقوں میں صلح قریب تھی، مگر فتنہ بھڑکانے والوں کی کوششوں نے رات کو جنگ چھیڑ دی۔`,
      `معرکہ ام المؤمنین کے اونٹ کے گرد گھومتا رہا یہاں تک کہ اسی نام سے موسوم ہوا؛ اُس میں طلحہ اور زبیر شہید ہوئے — زبیر نبی کریم ﷺ کی ایک حدیث کی یاد دلائے جانے پر جنگ سے کنارہ کش ہو گئے تھے، پھر دغا سے قتل ہوئے — اور بہت سے مسلمان بھی۔`,
      `علی نے ام المؤمنین کی تکریم کی اور اُنہیں باعزت مدینہ روانہ کیا، اور سب اُس پر نادم ہوئے جو ہوا۔ اہلِ سنت صحابہ کے درمیان جو ہوا اُس سے زبان بند رکھتے ہیں اور اُن سب کے لیے استغفار کرتے ہیں: "اے ہمارے رب! ہمیں اور ہمارے اُن بھائیوں کو بخش دے جو ایمان میں ہم سے پہلے گزر گئے۔"`,
    ],
    source: `الطبری، تاریخ الرسل والملوک · ابن کثیر، البدایہ والنہایہ`,
    disputed: `مشہور یہ ہے کہ یہ 10 جمادی الثانی 36ھ میں ہوا؛ بعض نے وسطِ جمادی الاول کہا۔`,
  },
  'battle-of-zab': {
    year: `132ھ`,
    title: `معرکۂ زاب اور اموی ریاست کا خاتمہ`,
    summary: `بنو امیہ کے آخری خلیفہ مروان بن محمد موصل کے قریب نہرِ زابِ اعظم پر عباسی لشکر سے شکست کھا گئے، تو اموی ریاست قریباً نوے سال کی حکمرانی کے بعد ڈھے گئی، اور اُس کے کھنڈرات پر عباسی ریاست قائم ہوئی۔`,
    story: [
      `مروان بن محمد — جو بنو امیہ میں سب سے بہادر اور سخت جان تھے یہاں تک کہ اپنے صبر کے سبب "حمارُ الجزیرہ" کہلائے — اہلِ شام و جزیرہ کے جتھوں کے ساتھ السفّاح کے چچا عبد اللہ بن علی کی قیادت میں بڑھتے عباسی لشکر سے مقابلے کو نکلے۔`,
      `دونوں لشکر زابِ اعظم کے کنارے ٹکرائے، تو خراسانی اپنی منظم صفوں اور نیزوں کے ساتھ گھٹنوں کے بل جم جانے کے طریقے سے ثابت قدم رہے، مروان کا لشکر بکھر گیا اور بہت سے دریا میں غرق ہوئے، اور مروان بے تحاشا فرار ہوئے۔`,
      `عباسیوں نے جزیرہ سے شام پھر مصر تک اُن کا پیچھا کیا یہاں تک کہ وہ اُس کے صعید میں بوصیر میں قتل ہوئے، اور اُن کے قتل سے مشرق میں اموی ریاست کا صفحہ لپٹ گیا، اور بنو امیہ میں سے عبد الرحمٰن الداخل بچ نکلے تاکہ اُن کے لیے اندلس میں ایک نئی حکومت قائم کریں۔`,
    ],
    source: `الطبری، تاریخ الرسل والملوک · ابن الأثیر، الکامل فی التاریخ`,
  },
  'ghazali-death': {
    year: `505ھ`,
    title: `ابو حامد الغزالی کی وفات`,
    summary: `حجۃ الإسلام ابو حامد الغزالی — صاحبِ "إحیاء علوم الدین"، فقیہ، اصولی، متکلم جنہوں نے بغداد میں تدریس کی سربراہی چھوڑ کر ایک مشہور زہد کے سفر پر نکلے جس نے اُن کی زندگی اور فکر کا رخ بدل دیا — طوس میں وفات پا گئے۔`,
    story: [
      `الغزالی 450ھ میں طوس میں پیدا ہوئے، اور امام الحرمین جوینی کے شاگرد ہوئے یہاں تک کہ فقہ، اصول اور کلام میں مہارت پائی۔ نظام الملک نے اُنہیں چالیس سال سے پہلے بغداد کے مدرسۂ نظامیہ میں تدریس سونپی، تو اُن کی شہرت پھیلی اور طلبہ اُن پر ٹوٹ پڑے۔`,
      `پھر اُنہیں ایک گہرا روحانی بحران پیش آیا جسے اُنہوں نے "المنقذ من الضلال" میں بیان کیا، تو اُنہوں نے جاہ و تدریس چھوڑ کر قریباً دس سال دمشق، قدس اور حجاز کے درمیان تجرد میں گزارے، اور اسی دوران اپنی سب سے مشہور کتاب "إحیاء علوم الدین" دلوں اور اعمال کی اصلاح میں لکھی۔`,
      `آخر کار طوس لوٹ کر تعلیم و عبادت کرتے رہے یہاں تک کہ 14 جمادی الثانی 505ھ کو پچپن سال کی عمر میں وفات پائی، اور ایک بڑا ورثہ چھوڑا جس میں اصول میں "المستصفیٰ" اور "تہافت الفلاسفہ" ہے جس نے عالمِ اسلام میں یونانی فلسفے کو ہلا دیا۔`,
    ],
    source: `ابن خلکان، وفیات الأعیان · الذہبی، سیر أعلام النبلاء`,
  },
  'abu-bakr-death': {
    year: `13ھ`,
    title: `ابو بکر صدیق رضی اللہ عنہ کی وفات`,
    summary: `رسول اللہ ﷺ کے خلیفہ ابو بکر صدیق دو سال تین ماہ کی خلافت کے بعد مدینہ میں وفات پا گئے، جس میں اللہ نے اسلام کی حفاظت کی: اُنہوں نے مرتدین سے جنگ کی، قرآن جمع کیا، عراق و شام کی فتح کے لیے لشکر روانہ کیے، اور معاملہ عمر کے سپرد کیا۔`,
    story: [
      `ابو بکر مردوں میں سب سے پہلے ایمان لائے، غار اور ہجرت میں نبی کریم ﷺ کے رفیق، اور آپ ﷺ کی وفات کے دن امت کو ثابت رکھنے والے تھے۔ جب خلافت سنبھالی تو عربوں کے ارتداد کا پہاڑوں جیسے عزم سے سامنا کیا اور اپنا جملہ کہا: "اللہ کی قسم! اگر وہ مجھ سے ایک رسی بھی روکیں گے جو وہ رسول اللہ کو دیتے تھے تو میں اُس کے روکنے پر اُن سے جنگ کروں گا۔"`,
      `اُن کی مختصر خلافت میں یمامہ میں قرّاء کے قتل کے بعد عمر کے مشورے سے قرآن ایک مصحف میں جمع ہوا، اور فتح کے لشکر عراق و شام کی طرف روانہ ہوئے، اور اس کے ساتھ آپ مہاجرین میں سب سے فقیر کی سی زندگی گزارتے تھے۔`,
      `آپ پندرہ دن بیمار رہے، تو بڑے صحابہ سے مشورہ کیا اور تفرقے کا دروازہ بند کرنے کے لیے خلافت عمر بن الخطاب کے سپرد کی، اور جمادی الثانی 13ھ کی آٹھ راتیں باقی رہتے منگل کی رات تریسٹھ سال کی عمر میں وفات پائی، اور عائشہ کے حجرے میں اپنے ساتھی ﷺ کے پہلو میں دفن ہوئے۔`,
    ],
    source: `الطبری، تاریخ الرسل والملوک · الذہبی، سیر أعلام النبلاء`,
    disputed: `مشہور یہ ہے کہ آپ 22 جمادی الثانی 13ھ کی رات وفات پائے؛ بعض نے 23 کہا۔`,
  },
  // ————————————————— رجب —————————————————
  'tabuk': {
    year: `9ھ`,
    title: `غزوۂ تبوک — جیشِ عُسرت`,
    summary: `نبی کریم ﷺ روم کے مقابلے کے لیے دور شمال میں تبوک کی طرف تیس ہزار کے ساتھ نکلے، سخت گرمی اور نمایاں تنگی میں۔ کوئی جنگ نہ ہوئی؛ یہ آپ ﷺ کا آخری غزوہ اور صدق و بذل کا عظیم ترین سبق تھا۔`,
    story: [
      `نبی کریم ﷺ کو روم کے شام کے کناروں پر جمع ہونے کی خبر پہنچی، تو آپ نے — اپنی عادت کے برخلاف — دوری، شدتِ گرمی اور پھلوں کی پختگی کی بنا پر اپنی منزل صراحتاً بتائی، اور خرچ کی ترغیب دی تو عثمان نے ایک تہائی لشکر تیار کیا، ابو بکر اپنا سارا مال لائے اور عمر آدھا۔`,
      `تیس ہزار کا جیشِ عُسرت کھجوریں نچوڑتا اور ایک ہی اونٹ باری باری استعمال کرتا چلا؛ منافقین پیچھے رہ گئے، اور سچوں میں سے تین پیچھے رہ گئے جن کی توبہ کو سورۃ التوبہ نے کعب بن مالک کے مشہور قصے میں امر بنا دیا۔`,
      `آپ ﷺ تبوک میں قریباً بیس راتیں ٹھہرے اور روم سے کوئی جنگ نہ ہوئی، اور اہلِ ایلہ، اذرح اور دومۃ الجندل سے جزیہ پر صلح کی، تو اس غزوے نے روم کی سرحدوں پر مسلم ریاست کی ہیبت کو راسخ کیا اور آپ کے بعد فتحِ شام کی راہ ہموار کی۔`,
    ],
    source: `ابن ہشام، السیرہ النبویہ · صحیح البخاری (حدیثِ کعب بن مالک)`,
    disputed: `ابن اسحاق کے مطابق آپ ﷺ رجب 9ھ میں اس کے لیے نکلے؛ دنِ روانگی ضبط نہیں۔`,
  },
  'nakhla-expedition': {
    year: `2ھ`,
    title: `سریۂ عبد اللہ بن جحش اور آیتِ اشہرِ حرم کا نزول`,
    summary: `نبی کریم ﷺ نے عبد اللہ بن جحش کو ایک گروہ کے ساتھ نخلہ بھیجا کہ قریش کے قافلے کی نگرانی کریں۔ اُنہوں نے حرمت والے مہینے رجب کے آخری دن ایک شخص کو قتل کر دیا؛ قریش نے شور مچایا، تو اللہ نے حرمت والے مہینے میں قتال کا فیصلہ کن حکم نازل کیا۔`,
    story: [
      `نبی کریم ﷺ نے عبد اللہ بن جحش کو ایک خط دیا اور حکم دیا کہ دو دن سے پہلے نہ کھولنا۔ جب اُنہوں نے کھولا تو اُس میں تھا کہ مکہ اور طائف کے درمیان نخلہ کی طرف جا کر قریش کی نگرانی کریں، تو اُنہوں نے کہا: سمعاً و طاعۃً، اور اُن کے ساتھی خوشی سے اُن کے ساتھ چلے۔`,
      `قریش کا ایک قافلہ تجارت لادے اُن کے پاس سے گزرا، تو گروہ نے — اور وہ رجب کا آخری دن تھا — حرمت والے مہینے کی پامالی یا قافلے کے نکل جانے کے درمیان مشورہ کیا، تو تیر چلائے اور عمرو بن الحضرمی کو قتل کیا اور دو آدمی قید کیے، تو نبی کریم ﷺ نے معاملہ مؤخر کیا اور اُن پر ناراضی ظاہر کی۔`,
      `قریش نے شور مچایا کہ محمد نے حرمت والے مہینے کو حلال کر لیا، تو اللہ نے نازل کیا: "وہ تم سے حرمت والے مہینے میں لڑنے کے بارے میں پوچھتے ہیں، کہہ دو اُس میں لڑنا بڑا (گناہ) ہے، مگر اللہ کے راستے سے روکنا اور اُس کا انکار... اور فتنہ قتل سے بڑا ہے۔" آیت نے میزان قائم کر دی: مہینے کی حرمت عظیم ہے، مگر لوگوں کو اُن کے دین سے پھیرنا اُس سے بڑا ہے۔`,
    ],
    source: `ابن ہشام، السیرہ النبویہ · الطبری، جامع البیان (تفسیرِ آیۃ البقرہ 217)`,
    disputed: `مشہور یہ ہے کہ قتال رجب 2ھ کے آخری دن ہوا؛ بعض نے ہلال کی رؤیت میں اشتباہ کی بنا پر پہلی شبِ شعبان کہا۔`,
  },
  'yarmouk': {
    year: `15ھ`,
    title: `معرکۂ یرموک`,
    summary: `قریباً چھتیس ہزار مسلمان یرموک کے کناروں پر روم کے دو لاکھ سے زائد جتھوں سے ٹکرائے، تو اللہ نے اُن کے لیے ایسی فیصلہ کن فتح لکھی جس نے روم کو ہمیشہ کے لیے شام سے نکال دیا۔`,
    story: [
      `ہرقل نے شام کی بازیابی کے لیے اپنے عظیم ترین لشکر جمع کیے، تو مسلمان یرموک کے میدان میں سمٹ آئے۔ خالد بن الولید نے لشکروں کو متحد کر کے کراديس (دستوں) میں تقسیم کیا، اور اپنا جملہ کہا: "یہ اللہ کے دنوں میں سے ایک دن ہے، اس میں نہ فخر مناسب ہے نہ سرکشی۔"`,
      `مسلمانوں نے روم کے تباہ کن حملوں کا کئی دن سامنا کیا، اور عورتیں صفوں کے پیچھے ثابت قدم رہ کر بھاگنے والوں کو پلٹاتی رہیں، یہاں تک کہ خالد نے عام حملہ کیا؛ روم کو گھیر کر اُنہیں واقوصہ کی طرف دھکیل دیا جہاں اُن کے ہزاروں اپنی گھاٹیوں میں گر پڑے۔`,
      `روم کے دسیوں ہزار مارے گئے اور مسلمانوں میں سے قریباً تین ہزار شہید ہوئے جن میں عکرمہ بن ابی جہل تھے، اور ہرقل نے الوداع کہتے ہوئے اپنا مشہور جملہ کہا: "اے شام تجھ پر سلام، ایسا سلام جس کے بعد واپسی نہیں۔" پس یرموک روم کے شام سے ہمیشہ کے لیے نکلنے کا دن تھا۔`,
    ],
    source: `الطبری، تاریخ الرسل والملوک · ابن کثیر، البدایہ والنہایہ`,
    disputed: `ابن اسحاق اور طبری کے نزدیک مشہور یہ ہے کہ یہ رجب 15ھ میں ہوا؛ سیف بن عمر جیسے بعض نے اجنادین کے فوراً بعد 13ھ کہا۔`,
  },
  'zallaqa': {
    year: `479ھ`,
    title: `معرکۂ زلّاقہ`,
    summary: `مرابطین کے امیر یوسف بن تاشفین اندلس کے بادشاہوں کی مدد کو سمندر پار کر کے آئے، اور المعتمد بن عباد کے ساتھ بطلیوس کے قریب میدانِ زلّاقہ میں الفانسو ششم کے لشکر سے ٹکرائے، اور اسے ایسی کچلنے والی شکست دی جس نے قشتالی پیش قدمی کو ایک پوری نسل کے لیے روک دیا۔`,
    story: [
      `جب 478ھ میں طلیطلہ گرا اور الفانسو ششم ملوکِ طوائف پر سخت ہوا، تو اُنہوں نے مراکش کے حکمران امیر المسلمین یوسف بن تاشفین سے مدد مانگی، اور المعتمد بن عباد نے اپنا لازوال جملہ کہا: "اونٹ چرانا خنزیر چرانے سے بہتر ہے۔"`,
      `ابن تاشفین مرابطین کے لشکروں کے ساتھ سمندر پار آئے، المعتمد اور ملوکِ طوائف اُن سے مل گئے، اور دونوں لشکر جمعہ 12 رجب 479ھ (اکتوبر 1086ء) کو میدانِ زلّاقہ میں ٹکرائے۔ المعتمد مقدمے میں بہادروں کی طرح ثابت قدم رہے یہاں تک کہ زخم اُن پر بھاری ہو گئے۔`,
      `پھر ابن تاشفین نے اپنی چال چلی: اپنے احتیاطی دستوں اور زمین ہلا دینے والے نقّاروں سے قشتالی لشکر گاہ کو گھیر لیا، تو الفانسو زخمی حالت میں چند لوگوں کے ساتھ فرار ہوا۔ زلّاقہ نے اندلس کے سقوط کو صدیوں مؤخر کیا اور وہاں مرابطین کی ریاست کی راہ ہموار کی۔`,
    ],
    source: `عبد الواحد المراکشی، المعجب · ابن الأثیر، الکامل فی التاریخ`,
  },
  'umar-abdulaziz-death': {
    year: `101ھ`,
    title: `خلیفہ عمر بن عبد العزیز کی وفات`,
    summary: `پانچویں خلیفہ راشد عمر بن عبد العزیز دیرِ سمعان میں وفات پا گئے، ڈھائی سال کی خلافت کے بعد جس میں اُنہوں نے زمین کو عدل سے بھر دیا یہاں تک کہ کہا گیا: آدمی اپنی زکات لے کر نکلتا مگر کوئی فقیر نہ پاتا جو اسے قبول کرے۔`,
    story: [
      `عمر بن عبد العزیز نے 99ھ میں خلافت سنبھالی تو رو پڑے اور کہا: یہ آزمائش اور فتنہ ہے، پھر اپنی ذات سے آغاز کیا اور جاگیریں اور جواہر بیت المال کو لوٹا دیے، اور اپنے اہل کو بھی اسی پر رکھا، اور زاہدوں کی سی زندگی گزاری جبکہ خلیفہ تھے جن کی طرف دنیا سمیٹی جاتی تھی۔`,
      `اُنہوں نے مظالم اُن کے مالکوں کو لوٹائے چاہے وہ کوئی بھی ہوں، اور جن محصولات نے لوگوں پر بوجھ ڈالا تھا اُنہیں ختم کیا، اور اپنے عمّال کو عدل اور ایذا سے باز رہنے کا حکم دیا، تو اُن کی خلافت میں مال یوں امنڈا کہ اعلان کیا گیا: مقروض کہاں ہیں؟ نکاح کے خواہش مند کہاں ہیں؟ یہاں تک کہ سب بے نیاز کر دیے گئے۔`,
      `اُنہوں نے علم کے ضیاع کے خوف سے ابو بکر بن حزم کو سنت کی تدوین کا حکم دیا، تو یہ حدیث کی پہلی سرکاری تدوین تھی۔ اُن کے دن طویل نہ ہوئے؛ کہا جاتا ہے اُنہیں زہر دیا گیا، اور وہ حمص کے قریب دیرِ سمعان میں 101ھ میں قریباً چالیس سال کی عمر میں وفات پا گئے، تو مسلمانوں نے اُن پر گریہ کیا اور اُنہیں راشدین میں شمار کیا۔`,
    ],
    source: `الذہبی، سیر أعلام النبلاء · ابن عبد الحکم، سیرہ عمر بن عبد العزیز`,
    disputed: `مشہور یہ ہے کہ آپ 20 رجب 101ھ کو وفات پائے؛ بعض نے 25 کہا۔`,
  },
  'nawawi-death': {
    year: `676ھ`,
    title: `امام نووی کی وفات`,
    summary: `امام یحییٰ بن شرف النووی اپنے گاؤں نوا (حوران) میں پینتالیس سال کی عمر میں وفات پا گئے، اور ایسی کتابیں چھوڑیں جو امت کا سرمایہ بنیں: ریاض الصالحین، الاربعین النوویہ، شرحِ صحیح مسلم، اور المجموع۔`,
    story: [
      `نووی جوانی میں دمشق آئے اور مدرسۂ رواحیہ میں علم کے لیے گوشہ نشین ہو گئے، ہر دن اپنے مشایخ پر بارہ سبق پڑھتے، اور رات دن کا کوئی لمحہ ضائع نہ کرتے، یہاں تک کہ فقہ، حدیث اور لغت میں اپنے ہم عصروں سے آگے نکل گئے۔`,
      `اُنہوں نے علم کے ساتھ زہد و ورع کو جمع کیا؛ کسی سے کچھ قبول نہ کرتے، اُن کا لباس کھردرا اور خوراک قلیل تھی، اور خود سلطان الظاہر بیبرس کے سامنے حق کی بات کھل کر کہی، مشہور خطوط میں جن میں لوگوں سے محصولات اور مصادرات کا دفاع کیا۔`,
      `اُنہوں نے اپنی مختصر عمر میں وہ کچھ لکھا جو معمر لوگ نہ لکھ سکے: "ریاض الصالحین"، "الأذکار"، "الأربعین"، "منہاج الطالبین"، "المنہاج شرح صحیح مسلم" اور "المجموع"۔ عمر کے آخر میں نوا لوٹے اور وہیں 24 رجب 676ھ کو وفات پائی، اور اُن کی کتابیں آج تک ہر علمی گھر میں موجود ہیں۔`,
    ],
    source: `الذہبی، سیر أعلام النبلاء · السخاوی، ترجمہ النووی`,
  },
  'imam-muslim-death': {
    year: `261ھ`,
    title: `امام مسلم بن الحجاج کی وفات`,
    summary: `امام مسلم بن الحجاج القشیری — صاحبِ "الصحیح"، جو صحیح البخاری کے بعد سب سے صحیح کتاب ہے، جسے اُنہوں نے تین لاکھ سنی ہوئی احادیث سے منتخب کیا اور نہایت عمدہ ترتیب دی — نیشاپور میں وفات پا گئے۔`,
    story: [
      `مسلم نیشاپور میں قریباً 204ھ میں پیدا ہوئے، اور طلبِ حدیث میں حجاز، عراق، شام اور مصر کا سفر کیا، اور جب امام بخاری نیشاپور آئے تو اُن کی صحبت اختیار کی اور کہا: "اے استاذ الاساتذہ اور سیدِ محدثین! مجھے اپنے قدم چومنے دیں۔"`,
      `اُنہوں نے "المسند الصحیح" پندرہ سال میں مرتب کیا، اسے تین لاکھ احادیث سے جمع کیا، اور حدیث کے طرق کو ایک جگہ جمع کرنے اور حسنِ ترتیب سے ممتاز رہے، یہاں تک کہ اہلِ مغرب میں سے بعض نے کہا: آسمان کے نیچے مسلم کی کتاب سے زیادہ صحیح کچھ نہیں۔`,
      `اُن کی وفات کے سبب میں کہا گیا کہ اُن سے ایک حدیث پوچھی گئی جو اُنہیں یاد نہ آئی، تو وہ رات بھر اپنی کتابوں میں تلاش کرتے رہے، اُن کے پاس کھجوروں کی ٹوکری تھی جس سے ایک ایک کھجور کھاتے رہے یہاں تک کہ صبح ہو گئی اور حدیث مل گئی اور ٹوکری ختم ہو گئی۔ اسی سے بیمار ہوئے اور 25 رجب 261ھ کو وفات پائی، اور نیشاپور میں دفن ہوئے۔`,
    ],
    source: `الذہبی، سیر أعلام النبلاء · ابن خلکان، وفیات الأعیان`,
  },
  'isra-miraj': {
    year: `قبل الہجرت`,
    title: `اسراء و معراج`,
    summary: `اللہ نے اپنے نبی ﷺ کو رات کے وقت مسجدِ حرام سے مسجدِ اقصیٰ لے جایا، پھر آپ کو بلند آسمانوں تا سدرۃ المنتہیٰ عروج کرایا، اور پانچ نمازیں فرض کی گئیں — یہ قرآن کے بعد سب سے بڑا معجزہ ہے۔`,
    story: [
      `یہ مبارک سفر دعوت کے سخت ترین برسوں کے بعد آیا: ابو طالب اور خدیجہ کی وفات اور اہلِ طائف کے انکار کے بعد، تو یہ اللہ کی طرف سے اپنے نبی ﷺ کے لیے تسلی اور آپ کی منزلت کا اظہار تھا۔ اللہ نے فرمایا: "پاک ہے وہ ذات جو اپنے بندے کو رات کے وقت مسجدِ حرام سے مسجدِ اقصیٰ لے گئی۔"`,
      `آپ کو براق پر سوار کیا گیا تو آپ بیت المقدس پہنچے، وہاں آپ ﷺ نے انبیاء کی امامت کی، پھر آپ کو آسمان در آسمان عروج کرایا گیا، جہاں آپ آدم، یحییٰ، عیسیٰ، یوسف، ادریس، ہارون، موسیٰ اور ابراہیم سے ملے، یہاں تک کہ سدرۃ المنتہیٰ پہنچے اور آپ پر پچاس نمازیں فرض کی گئیں پھر پانچ تک کم کر دی گئیں پچاس کے اجر کے ساتھ۔`,
      `جب آپ نے قریش کو بتایا تو اُنہوں نے جھٹلایا اور بیت المقدس کی کیفیت پوچھی تو اللہ نے اسے آپ کے سامنے کر دیا یہاں تک کہ آپ نے اُس کا وصف بیان کیا، اور ابو بکر نے بلا تردد آپ کی تصدیق کی تو "الصدیق" کہلائے، اور یہ قصہ مسلمانوں کے عقیدے میں مسجدِ اقصیٰ کی منزلت کا گواہ رہا۔`,
    ],
    source: `صحیح البخاری و صحیح مسلم (احادیثِ اسراء و معراج)`,
    disputed: `شبِ اسراء کی تعیین میں کوئی صحیح حدیث ثابت نہیں؛ لوگوں میں مشہور 27 رجب ہے، اور بعض نے ربیع الاول، رمضان یا شوال کہا۔ حافظ ابن حجر وغیرہ نے تصریح کی کہ اُس کی تعیین میں کچھ صحیح نہیں۔`,
  },
  'jerusalem-liberation': {
    year: `583ھ`,
    title: `صلاح الدین کے ہاتھوں بیت المقدس کی بازیابی`,
    summary: `صلاح الدین ایوبی مختصر محاصرے کے بعد صلح سے قدس میں داخل ہوئے، اور اکیانوے سال کے صلیبی قبضے کے بعد اقصیٰ کو دوبارہ مسجد بنایا، اور جب اہلِ شہر کو امان دی اور انتقام نہ لیا تو عفو کی مثال قائم کی۔`,
    story: [
      `حطین کے بعد ساحلی شہر صلاح الدین کے ہاتھوں گرتے گئے، پھر اُنہوں نے قدس کا محاصرہ کیا جس میں دسیوں ہزار صلیبی جمع تھے۔ جب وہ سقوط کے قریب پہنچا تو اہلِ شہر نے امان مانگی، تو آپ نے اُن سے معمولی فدیے پر صلح کی اور ہزاروں کو جو اس سے عاجز تھے چھوڑ دیا۔`,
      `اور آپ اُس میں جمعہ 27 رجب 583ھ کو داخل ہوئے — مشہور قول کے مطابق شبِ اسراء کی یاد میں — تو قبۃ الصخرہ سے صلیب ہٹائی گئی، مسجدِ اقصیٰ کو پاک کر کے عرق گلاب سے دھویا گیا، اور چورانوے سال کے وقفے کے بعد اُس میں جمعہ قائم کیا گیا۔`,
      `مشرق و مغرب کے مؤرخین نے اُن کے رحم دلانہ داخلے اور 492ھ کے صلیبی قتلِ عام — جب گھوڑے خون میں تیرے — کے درمیان موازنہ کیا؛ صلاح الدین کا عفو تاریخ کے روشن ترین صفحات میں سے تھا، اور نور الدین زنکی کا منبر اقصیٰ میں نصب کیا گیا، دہائیوں پہلے شروع ہونے والے خواب کی تکمیل۔`,
    ],
    source: `ابن شداد، النوادر السلطانیہ · ابن الأثیر، الکامل فی التاریخ`,
  },
  'ottoman-caliphate-abolished': {
    year: `1342ھ`,
    title: `خلافتِ عثمانیہ کا خاتمہ`,
    summary: `مصطفیٰ کمال کی قیادت میں ترک قومی اسمبلی نے خلافت کے خاتمے اور آخری خلیفہ عبد المجید ثانی کی جلاوطنی کا فیصلہ جاری کیا۔ اس کے ساتھ قریباً تیرہ صدیوں پر پھیلی خلافت کے بعد مسلمانوں کی آخری جامع علامت گر گئی۔`,
    story: [
      `خلافتِ عثمانیہ صدیوں سے کمزور ہو چکی تھی یہاں تک کہ ریاست پہلی جنگِ عظیم میں شکست کھا گئی اور استنبول پر قبضہ ہوا، پھر 1922ء میں خلافت سلطنت سے جدا کر دی گئی اور عبد المجید ثانی بغیر حکومت کے برائے نام خلیفہ رہے۔`,
      `28 رجب 1342ھ (3 مارچ 1924ء) کو انقرہ میں گرینڈ نیشنل اسمبلی نے خلافت کے منصب کو حتمی طور پر ختم کرنے اور آلِ عثمان کو ترکی سے نکالنے کے حق میں ووٹ دیا، تو عبد المجید ثانی اگلی صبح کی ٹرین سے سوئٹزرلینڈ روانہ ہو گئے۔`,
      `عالمِ اسلام اس خبر سے ہل گیا؛ قاہرہ اور مکہ میں خلافت کانفرنسیں بے سود منعقد ہوئیں، اور یہ واقعہ جدید تاریخ میں ایک نمایاں سنگِ میل رہا، جس کے بعد امت قومی ریاستوں میں بٹ گئی — بہت سے محققین اسی سے ایک بالکل نئے دور کا آغاز شمار کرتے ہیں۔`,
    ],
    source: `دستاویزات و مصادرِ جدید تاریخ (ترک قومی اسمبلی کا فیصلہ، 3 مارچ 1924ء)`,
    disputed: `فیصلہ 3 مارچ 1924ء کو جاری ہوا، جو تقاویم کے فرق کے مطابق 27 یا 28 رجب 1342ھ کے موافق ہے، مراجع میں 28 رجب زیادہ مشہور ہے۔`,
  },
  // ————————————————— شعبان —————————————————
  'hussein-birth': {
    year: `4ھ`,
    title: `حسین بن علی رضی اللہ عنہما کی ولادت`,
    summary: `حسین بن علی بن ابی طالب — رسول اللہ ﷺ کے نواسے، آپ کے پھول اور جنت کے نوجوانوں کے سردار — مدینہ میں پیدا ہوئے۔ نبی کریم ﷺ نے اُن کی طرف سے عقیقہ کیا اور اُن کا نام حسین رکھا، اور وہ سینے سے قدموں تک سب سے زیادہ آپ سے مشابہ تھے۔`,
    story: [
      `حسین رسول اللہ ﷺ کی بیٹی فاطمہ اور علی بن ابی طالب کے ہاں ہجرت کے چوتھے سال شعبان میں، اپنے بھائی حسن کے قریباً ایک سال بعد پیدا ہوئے۔ نبی کریم ﷺ نے اُن کے کان میں اذان دی، عقیقہ کیا اور اُن کا نام حسین رکھا — عرب اس نام کو اس سے پہلے نہ جانتے تھے۔`,
      `اُن کی اور اُن کے بھائی کی فضیلت میں بہت سی صحیح احادیث ہیں؛ اُن میں آپ ﷺ کا فرمان: "حسن اور حسین جنت کے نوجوانوں کے سردار ہیں"، اور "حسین مجھ سے ہے اور میں حسین سے ہوں، اللہ اُس سے محبت کرے جو حسین سے محبت کرے۔" آپ ﷺ اُنہیں اپنی پیٹھ پر اٹھاتے اور جب وہ آپ پر سوار ہوتے تو سجدہ طویل کر دیتے۔`,
      `حسین بیتِ نبوت میں علم، عبادت اور شجاعت پر پروان چڑھے، اور کئی بار پیدل حج کرتے، یہاں تک کہ اللہ نے 61ھ میں کربلا میں شہادت پر اُن کا خاتمہ کیا، تو اُن کے لیے شرفِ نسب اور شرفِ شہادت جمع ہو گئے، رضی اللہ عنہ۔`,
    ],
    source: `ابن حجر، الإصابہ فی تمییز الصحابہ · الذہبی، سیر أعلام النبلاء`,
    disputed: `مشہور یہ ہے کہ آپ شعبان 4ھ میں پیدا ہوئے؛ بعض نے 3 شعبان اور بعض نے 5، اور بعض نے 3ھ کہا۔`,
  },
  'ramadan-fasting-ordained': {
    year: `2ھ`,
    title: `ماہِ رمضان کے روزوں کی فرضیت`,
    summary: `رمضان کے روزے ہجرت کے دوسرے سال شعبان میں اللہ کے اس فرمان سے فرض ہوئے: "پس تم میں سے جو اس مہینے کو پائے وہ اس کے روزے رکھے۔" نبی کریم ﷺ نے نو رمضان کے روزے رکھے، اور روزہ اسلام کا چوتھا رکن بن گیا۔`,
    story: [
      `روزے کی تشریع حکیمانہ تدریج سے گزری: نبی کریم ﷺ نے عاشوراء کا روزہ رکھا اور اُس کا حکم دیا، پھر روزے اور فدیے کے درمیان تخییر نازل ہوا: "اور جو اس کی طاقت رکھتے ہیں اُن پر فدیہ ہے، ایک مسکین کو کھانا کھلانا"، پھر عزم نازل ہوا: "پس تم میں سے جو اس مہینے کو پائے وہ اس کے روزے رکھے۔"`,
      `یہ شعبان 2ھ میں تھا، غزوۂ بدر سے قریباً ایک ماہ پہلے، پس مسلمانوں کا پہلا رمضان دوسرے سال کا رمضان تھا جس کی سترہ تاریخ کو غزوۂ بدرِ کبریٰ ہوا، تو اُنہوں نے روزہ اور جہاد کو جمع کیا۔`,
      `نبی کریم ﷺ نے نو رمضان کے روزے رکھے یہاں تک کہ اپنے رب سے جا ملے، اور اپنی امت کو سکھایا کہ روزہ ڈھال ہے، اور "رمضان کا مہینہ جس میں قرآن نازل کیا گیا، لوگوں کے لیے ہدایت" آگ سے آزادی کے لیے زندگی کا موقع ہے، تو رمضان قیامت تک مسلمانوں کا محبوب ترین مہینہ بن گیا۔`,
    ],
    source: `ابن کثیر، تفسیر القرآن العظیم اور البدایہ والنہایہ`,
    disputed: `اہلِ سیر کے اتفاق سے فرضیت شعبان 2ھ میں نازل ہوئی، اُس کے دن کی تعیین کے بغیر۔`,
  },
  'alarcos': {
    year: `591ھ`,
    title: `معرکۂ اَرَک (الارکوس)`,
    summary: `موحدی خلیفہ یعقوب المنصور نے طلیطلہ کے جنوب میں حصنِ اَرَک کے پاس قشتالہ کے بادشاہ الفانسو ہشتم کو کچلنے والی شکست دی، جسے مؤرخین نے اندلس میں آخری بڑی اسلامی فتوحات میں شمار کیا۔`,
    story: [
      `الفانسو ہشتم نے موحدین کی افریقہ میں مصروفیت سے فائدہ اٹھا کر مسلمانوں کی سرزمین پر اشبیلیہ کے کناروں تک حملہ کیا، اور المنصور کو ایک مشہور چیلنج کا خط بھیجا، تو المنصور مغرب سے بھاری لشکروں کے ساتھ سمندر پار آئے۔`,
      `دونوں لشکر 9 شعبان 591ھ (جولائی 1195ء) کو حصنِ اَرَک کے پاس ٹکرائے، تو المنصور نے ایک محکم چال کا حکم دیا: قشتالی مقدمے کو روکنا پھر قلب اور بازوؤں سے اسے گھیر لینا، تو قشتالہ کا لشکر پاش پاش ہو گیا اور الفانسو خود بمشکل بھاگا۔`,
      `حصن گر گیا اور مسلمانوں نے بے شمار مالِ غنیمت پایا، اور المنصور نے ہزاروں قیدیوں کو بلا فدیہ رہا کر دیا۔ مسلمانوں نے بہت سے قلعے واپس لیے، اور اَرَک کی فتح — دو دہائیوں بعد کارثۃ العقاب سے پہلے — اندلس میں اسلام کی عزت کے آخری بڑے دنوں میں سے رہی۔`,
    ],
    source: `عبد الواحد المراکشی، المعجب · ابن الأثیر، الکامل فی التاریخ`,
  },
  'qibla-change': {
    year: `2ھ`,
    title: `مسجدِ حرام کی طرف تحویلِ قبلہ`,
    summary: `بیت المقدس کی طرف سولہ ماہ نماز کے بعد، اللہ کا حکم آیا کہ قبلہ کعبۂ مشرفہ کی طرف پھیر دیا جائے، نبی کریم ﷺ کے اشتیاق کے جواب میں: "پس اپنا چہرہ مسجدِ حرام کی طرف پھیر لو"، تو امت اپنے قبلے سے ممتاز ہوئی۔`,
    story: [
      `نبی کریم ﷺ مکہ میں بیت المقدس کی طرف نماز پڑھتے اور کعبہ آپ کے سامنے ہوتا۔ جب آپ نے ہجرت کی تو سولہ ماہ بیت المقدس کی طرف نماز پڑھی جبکہ آپ چاہتے تھے کہ اپنے باپ ابراہیم کے قبلے کعبہ کی طرف پھیر دیے جائیں، اور امید و انتظار میں اپنا چہرہ آسمان کی طرف اٹھاتے۔`,
      `تو آیات نازل ہوئیں: "بے شک ہم تمہارے چہرے کا آسمان کی طرف پھرنا دیکھ رہے ہیں، پس ہم ضرور تمہیں اُس قبلے کی طرف پھیر دیں گے جسے تم پسند کرتے ہو، پس اپنا چہرہ مسجدِ حرام کی طرف پھیر لو۔" تو آپ ﷺ نماز میں پھر گئے، اور ایک شخص عصر پڑھتی قوم کے پاس آیا — اور ایک روایت میں اہلِ قباء کے پاس فجر میں — اور کہا: میں گواہی دیتا ہوں کہ میں نے رسول اللہ کے ساتھ مکہ کی طرف نماز پڑھی، تو وہ جیسے تھے ویسے ہی کعبہ کی طرف پھر گئے۔`,
      `یہود اور منافقین نے شور مچایا: اُنہیں اُن کے پہلے قبلے سے کس چیز نے پھیر دیا؟ تو اللہ نے نازل کیا: "کہہ دو مشرق و مغرب اللہ ہی کے ہیں۔" اور جس مسجد میں تحویل ہوئی وہ مسجدِ قبلتین کہلائی، اور کعبہ ہمیشہ کے لیے مسلمانوں کا جامع قبلہ بن گیا۔`,
    ],
    source: `صحیح البخاری · ابن کثیر، تفسیرِ سورۃ البقرہ`,
    disputed: `مشہور یہ ہے کہ تحویل شعبان 2ھ کے نصف میں بدر سے دو ماہ پہلے ہوئی؛ بعض نے رجب کہا، اور اہلِ سیر میں یہ اختلاف قدیم ہے۔`,
  },
  'kosovo-battle': {
    year: `791ھ`,
    title: `معرکۂ قوصوہ (کوسوو) اور سلطان مراد اوّل کی شہادت`,
    summary: `عثمانیوں نے سرب امیر لازار کی قیادت میں بلقانی صلیبی اتحاد کو میدانِ کوسوو میں توڑ دیا۔ سلطان مراد اوّل میدانِ جنگ میں شہید ہوئے، اور اس فتح نے عثمانیوں کے قدم بلقان میں صدیوں کے لیے جما دیے۔`,
    story: [
      `سرب امیر لازار نے عثمانیوں کو یورپ سے نکالنے کے لیے سرب، بوسنیائی اور دیگر کا اتحاد بنایا، تو سلطان مراد اوّل اپنے لشکر کے ساتھ سمندر پار آئے، اور دونوں لشکر 15 شعبان 791ھ (جون 1389ء) کو میدانِ قوصوہ ("کوسوو پولیے") میں ٹکرائے۔`,
      `ایک شدید معرکہ ہوا جس میں اتحاد ٹوٹ گیا اور لازار مارا گیا۔ جب سلطان مراد میدانِ جنگ کا جائزہ لے رہے تھے تو ایک زخمی سرب نے اُنہیں مہلک وار کیا، تو آپ آلِ عثمان کے پہلے سلطان تھے جو میدان میں شہید ہوئے۔`,
      `اُن کی شہادت کے فوراً بعد اُن کے بیٹے بایزید صاعقہ نے حکومت سنبھالی اور فتح مکمل کی۔ اس معرکے نے بلقان کو عثمانی ریاست کے لیے پانچ صدیوں کے لیے کھول دیا، اور کوسوو اُس دن سے آج تک مسلم اکثریتی سرزمین رہا۔`,
    ],
    source: `مصادرِ تاریخِ عثمانی و بلقانی`,
    disputed: `یہ 15 جون 1389ء کو ہوا، جو تحویل میں مشہور قول کے مطابق 15 شعبان 791ھ کے موافق ہے، بعض مراجع میں معمولی اختلاف کے ساتھ۔`,
  },
  'jerusalem-crusader-fall': {
    year: `492ھ`,
    title: `صلیبیوں کے ہاتھوں بیت المقدس کا سقوط`,
    summary: `پہلی صلیبی مہم نے پانچ ہفتوں کے محاصرے کے بعد قدس پر دھاوا بولا، اور اہلِ شہر میں ایک ہولناک قتلِ عام کیا جس میں مسجدِ اقصیٰ اور شہر کے گوشوں میں دسیوں ہزار مارے گئے، اور یہ اُن کے قبضے میں اکیانوے سال رہا۔`,
    story: [
      `پہلی صلیبی مہم کے جتھے 492ھ میں قدس کی فصیلوں تک پہنچے جبکہ مسلمان اپنی انتہائی تفرقے میں تھے؛ سلجوقی باہم لڑ رہے تھے اور فاطمی ایک سال پہلے شہر چھین چکے تھے، تو شہر کو کوئی مددگار نہ ملا۔`,
      `23 شعبان 492ھ (15 جولائی 1099ء) کو صلیبیوں نے شمال سے فصیلیں عبور کیں، اور ایک ایسا قتلِ عام کیا جسے مسلمانوں سے پہلے خود اُن کے مؤرخوں نے بیان کیا: مسجدِ اقصیٰ میں پناہ لینے والے قتل کیے گئے اور یہود اپنے کنیسہ میں جلا دیے گئے، یہاں تک کہ اُن کے ایک گواہ نے کہا: گھوڑے گھٹنوں تک خون میں تیرے۔`,
      `خبر نے عالمِ اسلام کو ہلا دیا، اور قاضی ابو سعد الہروی بغداد میں دیوانِ خلافت میں پکارتے کھڑے ہوئے: "کیا تمہیں امن کے سائے میں سونا زیب دیتا ہے جبکہ تمہارے بھائیوں کو شام میں سواریوں کی پیٹھ اور پرندوں کے پیٹ کے سوا کوئی ٹھکانہ نہیں؟" یہ صدا ایک طویل جہاد کا بیج تھی جو ایک صدی بعد نور الدین اور صلاح الدین کے ہاتھوں پھل لائی۔`,
    ],
    source: `ابن الأثیر، الکامل فی التاریخ · مصادرِ پہلی صلیبی مہم`,
    disputed: `شہر 15 جولائی 1099ء کو گرا، جو تقویم کے حساب کے فرق سے 22 یا 23 شعبان 492ھ کے موافق ہے۔`,
  },
  'ibn-kathir-death': {
    year: `774ھ`,
    title: `حافظ ابن کثیر کی وفات`,
    summary: `حافظ عماد الدین اسماعیل بن کثیر — صاحبِ "تفسیر القرآن العظیم" اور "البدایہ والنہایہ"، ابن تیمیہ اور المزی کے شاگرد، اور امت کے ورثے میں تفسیر و تاریخ کے ستونوں میں سے ایک — دمشق میں وفات پا گئے۔`,
    story: [
      `ابن کثیر بصریٰ الشام کے ایک گاؤں میں قریباً 701ھ میں پیدا ہوئے اور بچپن میں دمشق منتقل ہوئے، وہاں اُس کے بڑے علماء سے وابستہ ہوئے، حافظ المزی کی بیٹی سے شادی کی، اپنے استاد ابن تیمیہ سے متاثر ہوئے اور اُن کی بعض آزمائشوں میں اُن کی نصرت کی۔`,
      `اُنہوں نے اپنی مشہور تفسیر لکھی جو مأثور (روایت) کی سب سے صحیح اور مشہور تفسیر شمار ہوتی ہے، جس میں قرآن کی تفسیر قرآن سے، پھر سنت سے، پھر سلف کے اقوال سے کی۔ اُن کی "البدایہ والنہایہ" آغازِ تخلیق سے اُن کے عہد تک اسلامی تاریخ کا انسائیکلوپیڈیا ہے، اور اُنہوں نے علومِ حدیث کو "اختصار علوم الحدیث" میں سمویا۔`,
      `عمر کے آخر میں رات کو زیادہ لکھنے سے اُن کی بینائی چلی گئی، اور فرمایا: "میں اِسی میں — یعنی جمعِ تہذیب میں — رہا یہاں تک کہ میری بینائی چلی گئی۔" آپ دمشق میں شعبان 774ھ کو وفات پائے اور اپنی وصیت کے مطابق مقبرۃ الصوفیہ میں اپنے استاد ابن تیمیہ کے پہلو میں دفن ہوئے۔`,
    ],
    source: `ابن حجر، الدرر الکامنہ · ابن العماد، شذرات الذہب`,
    disputed: `اُن کے مترجمین کے اتفاق سے وہ شعبان 774ھ میں وفات پائے؛ بعض مصادر میں بغیر قطعیت کے 26 کا دن ذکر ہوا۔`,
  },
  // ————————————————— رمضان —————————————————
  'shaqhab': {
    year: `702ھ`,
    title: `معرکۂ شقحب (مرج الصفر)`,
    summary: `مملوکوں اور شام کے علماء کی قیادت میں — جن کے سرخیل ابن تیمیہ تھے — مسلمانوں نے فیصلہ کن معرکۂ شقحب میں آخری مغل یلغار کو دمشق سے پسپا کیا، اور فوجی روزے سے تھے تو ابن تیمیہ نے اُنہیں جنگ کے لیے قوت پانے کی خاطر افطار کا فتویٰ دیا۔`,
    story: [
      `مغل قطلوشاہ کی قیادت میں 702ھ میں شام پر یلغار کر آئے، اِس کے بعد کہ تین سال پہلے وادی الخزندار میں مسلمانوں کو شکست دے چکے تھے۔ لوگ گھبرا کر جلاوطنی کا ارادہ کرنے لگے، تو شیخ الإسلام ابن تیمیہ امراء اور عوام کو ثابت کرتے کھڑے ہوئے اور قسم کھائی: اِس بار تم ضرور منصور ہو گے۔`,
      `آپ خود مصر گئے تاکہ سلطان الناصر محمد کو ابھاریں؛ مصری لشکر آئے اور دونوں فوجیں دمشق کے جنوب میں شقحب کے قریب مرج الصفر میں 2 رمضان 702ھ کو ٹکرائیں۔ ابن تیمیہ نے فوجیوں کو افطار کا فتویٰ دیا اور خود اُن کے سامنے افطار کیا تاکہ وہ رخصت لیں اور قوت پائیں۔`,
      `تین دن ایک زبردست معرکہ ہوا جو مغلوں کی ایسی کچلنے والی شکست پر ختم ہوا کہ اُس کے بعد شام میں اُن کا کوئی وجود نہ رہا، اور فاتحین ایک یادگار عید میں دمشق داخل ہوئے، اور شقحب اسلام کے فیصلہ کن دنوں میں شمار ہوا۔`,
    ],
    source: `ابن کثیر، البدایہ والنہایہ (حوادثِ سنہ 702ھ)`,
  },
  'azhar-first-prayer': {
    year: `361ھ`,
    title: `جامعِ ازہر کا افتتاح`,
    summary: `جوہر الصقلی کے المعز کی قاہرہ میں بنائے گئے جامعِ ازہر میں پہلی نمازِ جمعہ ادا کی گئی، جو صدیوں پر عالمِ اسلام میں علم کا مشہور ترین مینار اور اُس کی قدیم ترین فعال جامعات میں سے بن گیا۔`,
    story: [
      `جب جوہر الصقلی نے 358ھ میں فاطمی خلیفہ المعز لدین اللہ کے لیے قاہرہ بسائی، تو اُس کے جامعِ اعظم کی تعمیر شروع کی، جو قریباً دو سال بعد مکمل ہوئی اور اُس میں پہلی جمعہ رمضان 361ھ (972ء) میں ادا کی گئی۔`,
      `کہا گیا کہ اسے سیدہ فاطمہ الزہراء رضی اللہ عنہا کی نسبت سے ازہر کا نام دیا گیا، اور جلد ہی یہ جامع مسجد سے دار التدریس میں بدل گیا جہاں فقہ و لغت کے حلقے قائم ہوتے، پھر ایوبیوں اور مملوکوں کے دور میں اہلِ سنت کے علوم کا قلعہ بن گیا۔`,
      `ازہر ایک ہزار سال تک اپنے اُن رواقوں میں دنیا کے کناروں سے طلبِ علم کے آنے والوں کا استقبال کرتا رہا جو اُن کے بلدوں کے ناموں سے معروف تھے، اور اُس نے حملوں اور استعمار کے سامنے عربی زبان اور شرعی علوم کا علم بلند رکھا، اور آج یہ عالمِ اسلام کی قدیم ترین فعال جامعہ ہے۔`,
    ],
    source: `المقریزی، المواعظ والاعتبار (الخطط) · ابن تغری بردی، النجوم الزاہرہ`,
    disputed: `المقریزی نے اُس میں پہلی جمعہ کو رمضان 361ھ میں مؤرخ کیا؛ بعض نے 7 رمضان کہا، اور دن کی تعیین ظنی ہے۔`,
  },
  'khadija-death': {
    year: `10 نبوی`,
    title: `ام المؤمنین خدیجہ رضی اللہ عنہا کی وفات`,
    summary: `ام المؤمنین خدیجہ بنت خویلد — رسول اللہ ﷺ پر سب سے پہلے ایمان لانے والی اور سب سے پہلے جان و مال سے آپ کی غم گساری کرنے والی — مکہ میں وفات پا گئیں، اُس سال میں جو آپ کے اُن پر اور ابو طالب پر غم کے سبب "عامُ الحزن" کہلایا۔`,
    story: [
      `خدیجہ رضی اللہ عنہا شرف اور مال میں قریش کی خواتین کی سردار تھیں۔ نبی کریم ﷺ نے بعثت سے پندرہ سال پہلے اُن سے شادی کی، تو جب غارِ حراء میں آپ پر وحی آئی تو آپ کانپتے دل کے ساتھ اُن کے پاس لوٹے، تو اُنہوں نے اپنا لازوال جملہ کہا: "ہرگز نہیں، اللہ کی قسم! اللہ آپ کو کبھی رسوا نہ کرے گا؛ آپ صلہ رحمی کرتے ہیں، کمزور کا بوجھ اٹھاتے ہیں، مہمان نوازی کرتے ہیں اور حق کی مصیبتوں پر مدد کرتے ہیں۔"`,
      `اُنہوں نے سب لوگوں سے پہلے آپ پر ایمان لایا، اور محاصرے اور اذیت کے برسوں میں اپنے مال و جان سے آپ کی غم گساری کی، اور ابراہیم کے سوا آپ کی تمام اولاد اُنہی سے ہوئی، اور آپ نے اُن کی زندگی میں کسی اور سے شادی نہ کی، اور اُن کی وفات کے بعد بھی اُنہیں یاد کرتے رہے یہاں تک کہ عائشہ نے کہا: میں نے جتنی غیرت خدیجہ پر کی کسی پر نہ کی۔`,
      `وہ بعثت کے دسویں سال رمضان میں ہجرت سے قریباً تین سال پہلے وفات پائیں، اور مکہ میں الحجون میں دفن ہوئیں۔ اُن کے رب نے اُنہیں جنت میں موتی کے ایک گھر کی بشارت دی جس میں نہ شور ہے نہ تھکن، اور آپ ﷺ نے فرمایا: "اُس کی بہترین عورت مریم ہیں اور اُس کی بہترین عورت خدیجہ ہیں۔"`,
    ],
    source: `صحیح البخاری (مناقبِ خدیجہ) · ابن سعد، الطبقات الکبریٰ`,
    disputed: `مشہور یہ ہے کہ وہ بعثت کے دسویں سال رمضان میں وفات پائیں؛ بعض نے بغیر قطعیت کے اُس کا دسواں دن ذکر کیا۔`,
  },
  'ramadan-war-1973': {
    year: `1393ھ`,
    title: `دسویں رمضان کی جنگ (اکتوبر 1973ء)`,
    summary: `مصری افواج نے نہرِ سویز عبور کر کے بارلیف لائن پر دھاوا بولا جبکہ شامی افواج نے جولان پر حملہ کیا، ایک بیک وقت پیش قدمی جس نے 1967ء کی شکست کے بعد امت کا اعتماد بحال کیا، اور "العبور" آج بھی عزم کی علامت ہے۔`,
    story: [
      `ہفتہ 10 رمضان 1393ھ (6 اکتوبر 1973ء) کو دوپہر دو بجے جدید تاریخ کا سب سے بڑا آبی عبور شروع ہوا: مصری موجیں ہزاروں توپوں کی آگ کی آڑ میں نہر عبور کر گئیں، اور پانی کے فوّاروں نے بارلیف لائن کی مٹی کی رکاوٹیں توڑ کر شگاف کھول دیے۔`,
      `"اللہ اکبر" کا نعرہ جنگ کی صدا بنا، اور بارلیف کے وہ قلعے جنہیں ناقابلِ تسخیر کہا جاتا تھا گھنٹوں میں گر گئے، اور جولان میں شامی افواج نے مضبوط مورچوں پر دھاوا بول کر پہلے دنوں میں سطح مرتفع کے کچھ حصے واپس لیے۔`,
      `شگاف اور جنگ بندی کے بعد جنگ کے عسکری و سیاسی انجام سے قطع نظر، عبور کا دن — جو جان بوجھ کر ماہِ صیام میں چنا گیا — یہ سبق دیتا رہا کہ رمضان جہاد اور عمل کا مہینہ ہے، جس میں امت بدر، عین جالوت اور حطین کو یاد کرتی ہے۔`,
    ],
    source: `جنگِ اکتوبر 1973ء کے معاصر عسکری مصادر و دستاویزات`,
  },
  'badr': {
    year: `2ھ`,
    title: `غزوۂ بدرِ کبریٰ — یومُ الفرقان`,
    summary: `تین سو کچھ اوپر مسلمان بدر کے چشمے پر قریش کے قریباً ایک ہزار سے ٹکرائے، تو اللہ نے فرشتوں کے ذریعے اُنہیں زبردست نصرت دی، شرک کے سردار مارے گئے، اور اللہ نے اسے یومُ الفرقان کا نام دیا۔`,
    story: [
      `نبی کریم ﷺ ابو سفیان کے قافلے کا راستہ روکنے نکلے مگر وہ بچ نکلا، اور قریش اپنی تجارت کی حفاظت کے لیے قریباً ایک ہزار میں تکبر سے نکلے پھر قتال کے سوا کسی چیز پر راضی نہ ہوئے۔ آپ ﷺ نے صحابہ سے مشورہ کیا تو مقداد نے کہا: ہم آپ سے وہ نہیں کہیں گے جو بنی اسرائیل نے موسیٰ سے کہا؛ اور سعد بن معاذ نے انصار کی طرف سے اپنا مشہور جملہ کہا۔`,
      `آپ ﷺ نے اپنی رات نماز اور اپنے رب سے مناجات میں گزاری: "اے اللہ! اگر یہ جماعت ہلاک ہو گئی تو تیری زمین میں تیری عبادت نہ ہو گی"، تو اللہ نے اپنے فرشتے نازل کیے: "میں ایک ہزار پے در پے آنے والے فرشتوں سے تمہاری مدد کرنے والا ہوں"، اور جمعہ 17 رمضان کو معرکہ ہوا تو مشرکین بھاگ کھڑے ہوئے۔`,
      `قریش کے ستر مارے گئے جن میں ابو جہل، امیہ بن خلف، عتبہ اور شیبہ تھے، اور ستر قید ہوئے، اور چودہ مسلمان شہید ہوئے، اور "اہلِ بدر" صحابہ میں بلند ترین مقام والے بن گئے، اور اللہ نے اُس دن کے بارے میں فرمایا: "اور جو کچھ ہم نے اپنے بندے پر فیصلے کے دن، جس دن دو جماعتیں ملیں، نازل کیا۔"`,
    ],
    source: `صحیح البخاری و مسلم · ابن ہشام، السیرہ النبویہ`,
  },
  'aisha-death': {
    year: `58ھ`,
    title: `ام المؤمنین عائشہ رضی اللہ عنہا کی وفات`,
    summary: `ام المؤمنین عائشہ بنت ابی بکر صدیق — نبی کریم ﷺ کی محبوب ترین زوجہ اور امت کی سب سے فقیہ خاتون، جنہوں نے — بقول بعض — امت کو اُس کے دین کا ایک چوتھائی پہنچایا — مدینہ میں وفات پا گئیں، اور اپنی وصیت کے مطابق رات کو بقیع میں دفن ہوئیں۔`,
    story: [
      `عائشہ رضی اللہ عنہا رسول اللہ ﷺ کی سنت کی سب سے بڑی عالمہ تھیں؛ اُنہوں نے آپ سے دو ہزار سے زائد احادیث روایت کیں، اور بڑے صحابہ کو جب کوئی معاملہ مشکل ہوتا تو اُن سے پوچھتے اور اُن کے پاس اُس کا علم پاتے۔ ابو موسیٰ نے کہا: ہمیں کبھی کوئی حدیث مشکل نہ ہوئی کہ ہم نے عائشہ سے پوچھا ہو مگر ہم نے اُن کے پاس اُس کا علم پایا۔`,
      `اُن کے بارے میں واقعۂ افک کے بعد سورۃ النور کی تلاوت کی جانے والی آیات میں سات آسمانوں کے اوپر سے اُن کی براءت نازل ہوئی، اور نبی کریم ﷺ اُنہی کے گھر، اُنہی کی باری میں، اُن کے سینے اور حلق کے درمیان وفات پائے، اور اُنہی کے حجرے میں دفن ہوئے۔`,
      `وہ آپ کے بعد قریباً اڑتالیس سال تک امت کو تعلیم دیتی رہیں، اور رمضان 58ھ میں قریباً چھیاسٹھ سال کی عمر میں وفات پائیں، اور وصیت کی کہ اُنہیں اپنی ساتھی امہات کے ساتھ رات کو بقیع میں دفن کیا جائے، تو ابو ہریرہ نے اُن کی نمازِ جنازہ پڑھائی اور لوگ اُن کے جنازے پر امنڈ آئے، رضی اللہ عنہا۔`,
    ],
    source: `الذہبی، سیر أعلام النبلاء · ابن سعد، الطبقات الکبریٰ`,
    disputed: `مشہور یہ ہے کہ وہ 17 رمضان 58ھ کی رات وفات پائیں؛ بعض نے 57ھ کہا۔`,
  },
  'makkah-conquest': {
    year: `8ھ`,
    title: `فتحِ مکہ`,
    summary: `نبی کریم ﷺ اپنے دس ہزار صحابہ کے ساتھ اللہ کے حضور تواضع سے سر جھکائے مکہ میں داخل ہوئے، تو کعبہ کے گرد بتوں کو توڑا اور یہ تلاوت کرتے تھے: "حق آ گیا اور باطل مٹ گیا"، اور اہلِ مکہ کو اپنے جملے سے معاف کیا: "جاؤ، تم آزاد ہو۔"`,
    story: [
      `جب قریش نے اپنے حلیف بنو بکر کے خزاعہ پر حملے سے صلحِ حدیبیہ توڑا، تو نبی کریم ﷺ نے مکمل رازداری سے تیاری کی اور دس ہزار کے ساتھ روانہ ہوئے، تو قریش اچانک لشکروں کو مکہ کے گرد پا کر حیران رہ گئے۔ آپ ﷺ نے اعلان کیا: "جو ابو سفیان کے گھر میں داخل ہو وہ مامون ہے، جو اپنا دروازہ بند کر لے وہ مامون ہے، اور جو مسجد میں داخل ہو وہ مامون ہے۔"`,
      `آپ ﷺ اللہ کے شکر میں اتنی تواضع سے مکہ کی بلندی سے داخل ہوئے کہ آپ کی ٹھوڑی قریب تھی کہ کجاوے کو چھو لے، اور خالد کی جانب معمولی جھڑپ کے سوا کوئی جنگ نہ ہوئی، اور آپ نے کعبہ کا رخ کیا جس کے گرد تین سو ساٹھ بت تھے، تو اُنہیں اپنی کمان سے ٹھوکتے اور کہتے: "حق آ گیا اور باطل مٹ گیا، بے شک باطل مٹنے والا ہے۔"`,
      `پھر آپ نے قریش سے، جن کے دل خوف سے بھرے تھے، فرمایا: "تم کیا سمجھتے ہو میں تمہارے ساتھ کیا کروں گا؟" اُنہوں نے کہا: کریم بھائی اور کریم بھائی کے بیٹے۔ آپ نے فرمایا: "جاؤ، تم آزاد ہو۔" یہ فتحِ اعظم تھی جس کے بعد لوگ فوج در فوج اللہ کے دین میں داخل ہوئے، اور بلال ایک نئے عہد کے اعلان کے طور پر کعبہ پر چڑھ کر اذان دینے لگے۔`,
    ],
    source: `صحیح البخاری و مسلم · ابن ہشام، السیرہ النبویہ`,
    disputed: `مشہور قول کے مطابق آپ ﷺ رمضان 8ھ کی دس راتیں باقی رہتے مکہ داخل ہوئے؛ روایات 19 اور 21 کے درمیان ہیں۔`,
  },
  'ali-martyrdom': {
    year: `40ھ`,
    title: `علی بن ابی طالب رضی اللہ عنہ کی شہادت`,
    summary: `خارجی عبد الرحمٰن بن ملجم نے امیر المؤمنین علی بن ابی طالب کو کوفہ میں فجر کی نماز کے لیے نکلتے وقت زہر آلود تلوار سے وار کیا۔ آپ دو دن بعد وفات پا گئے، یوں چوتھے خلیفہ راشد کا صفحہ لپٹ گیا۔`,
    story: [
      `تین خوارج نے علی، معاویہ اور عمرو بن العاص کو ایک ہی رات میں قتل کرنے کی سازش کی، اِس گمان سے کہ اُس سے امت کو آرام دیں گے۔ معاویہ اور عمرو کے قاتل ناکام رہے، جبکہ ابن ملجم کوفہ کی مسجد میں علی کے لیے گھات لگائے بیٹھا۔`,
      `19 رمضان 40ھ کی فجر کو علی لوگوں کو نماز کے لیے جگاتے نکلے اور پکار رہے تھے: نماز، نماز! ابن ملجم نے اُن کے سر پر زہر آلود تلوار سے وار کیا اور خوارج کا نعرہ بلند کیا: لا حکم إلا للہ، تو علی نے کہا: کعبہ کے رب کی قسم! میں کامیاب ہو گیا۔`,
      `وہ دو دن رہے، اللہ کے تقویٰ، جماعت سے وابستگی اور اپنے قاتل کے ساتھ احسان کی وصیت کرتے رہے — اگر معاف کریں تو، ورنہ بلا مثلہ برابر قصاص۔ آپ 21 رمضان کی رات تریسٹھ سال کی عمر میں وفات پا گئے؛ اُن کے دونوں بیٹوں نے اُنہیں غسل دیا، نمازِ جنازہ پڑھی اور کوفہ میں دفن کیا، اور اُن کے بعد اُن کے بیٹے حسن کی بیعت ہوئی۔`,
    ],
    source: `الطبری، تاریخ الرسل والملوک · الذہبی، سیر أعلام النبلاء`,
    disputed: `مشہور قول کے مطابق 19 رمضان کی فجر کو وار ہوا اور 21 کی رات 40ھ میں وفات پائی؛ بعض روایات میں 17 رمضان ہے۔`,
  },
  'ayn-jalut': {
    year: `658ھ`,
    title: `معرکۂ عین جالوت`,
    summary: `سلطان قطز اور بیبرس کی قیادت میں مسلمانوں نے فلسطین کے عین جالوت میں "ناقابلِ شکست" مغلوں کا افسانہ پاش پاش کر دیا، مصر اور عالمِ اسلام کو بچایا، اور پورے شام سے مغلوں کے اخراج کا آغاز کیا۔`,
    story: [
      `بغداد، حلب اور دمشق کے سقوط کے بعد ہلاکو نے مصر کی طرف ایک ہولناک دھمکی آمیز خط کے ساتھ قاصد بھیجے، تو قطز نے امراء کو جمع کر کے مقابلے کا فیصلہ کیا اور قاصدوں کو قتل کرا دیا، اور اپنا جملہ کہا: "میں خود تاتاریوں سے مقابلہ کروں گا"، اور کم تعداد و ساز و سامان کے باوجود لشکر کے ساتھ مصر سے نکلے۔`,
      `دونوں لشکر جمعہ 25 رمضان 658ھ (ستمبر 1260ء) کو بیسان کے قریب عین جالوت میں ٹکرائے، اور بیبرس نے مقدمے سے کتبغا کے لشکر کو گھات کی طرف کھینچا، اور جب دباؤ بڑھا تو قطز نے اپنا خود پھینک دیا اور اپنی گونجتی صدا بلند کی: وا اسلاماہ! اور خود حملہ کیا۔`,
      `کتبغا مارا گیا اور مغل لشکر تہس نہس ہو گیا — یہ چنگیز خان کے بعد مغلوں کی پہلی محقق بڑی شکست تھی — اور شام ہفتوں میں آزاد ہوا۔ اس معرکے سے اللہ نے مصر، حرمین اور اُن کے پیچھے مغرب کو محفوظ رکھا، تو یہ انسانی تاریخ کے فیصلہ کن ترین معرکوں میں شمار ہوا۔`,
    ],
    source: `المقریزی، السلوک · ابن کثیر، البدایہ والنہایہ`,
  },
  'guadalete': {
    year: `92ھ`,
    title: `معرکۂ وادی لکہ اور فتحِ اندلس`,
    summary: `طارق بن زیاد نے بارہ ہزار کے ساتھ بادشاہ لذریق کی قیادت میں گوتھوں کے لشکر کو فیصلہ کن معرکۂ وادی لکہ میں شکست دی، تو اندلس کے دروازے کھل گئے جو آٹھ صدیوں تک یورپ میں اسلامی تہذیب کا مینار بنے گا۔`,
    story: [
      `طارق بن زیاد نے موسیٰ بن نصیر کی اجازت سے رجب 92ھ میں وہ آبنائے عبور کی جو بعد میں اُن کے نام سے موسوم ہوئی، اور اُس پہاڑ کے پاس اترے جو اُن کے نام (جبلِ طارق) سے مشہور ہے۔ جب اُنہیں لذریق کی قریباً ایک لاکھ چالیس ہزار کے جتھوں کے ساتھ پیش قدمی کی خبر ملی تو موسیٰ سے کمک مانگی، تو اُنہوں نے کمک بھیجی۔`,
      `دونوں لشکر اندلس کے جنوب میں وادی لکہ (وادی برباط) کے کناروں پر آٹھ دن ٹکرائے، اور لذریق کے مخالفوں کے بازوؤں نے اپنے بادشاہ کو دغا دی، اور مسلمان ثابت قدم رہے یہاں تک کہ گوتھوں کا لشکر ڈھے گیا اور لذریق 28 رمضان 92ھ (جولائی 711ء) کو معرکے میں غرق یا مقتول ہوا۔`,
      `اُس کے بعد شہر یکے بعد دیگرے گرے: قرطبہ، پھر دار الحکومت طلیطلہ؛ پھر موسیٰ بن نصیر نے فتح مکمل کی، تو اندلس میں آٹھ صدیوں کی ایک تہذیب قائم ہوئی جس نے یورپ کو علم و عمران سے روشن کیا، قرطبہ اور الزہراء سے غرناطہ اور الحمراء تک۔`,
    ],
    source: `ابن عذاری، البیان المُغرب · المقّری، نفح الطیب`,
    disputed: `مشہور یہ ہے کہ فیصلہ کن معرکہ چند دن کی جنگ کے بعد 28 رمضان 92ھ میں تھا؛ بعض مصادر میں تعداد اور دنوں میں معمولی اختلاف ہے۔`,
  },
  'quran-first-revelation': {
    year: `قبل الہجرت`,
    title: `آغازِ نزولِ قرآن — لیلۃ القدر`,
    summary: `رمضان کی ایک مبارک رات میں جبریل نبی کریم ﷺ پر غارِ حراء میں قرآن کی پہلی وحی لے کر اترے: "پڑھو اپنے رب کے نام سے جس نے پیدا کیا"، تو یہ وہ رات تھی جس نے تاریخ کا رخ بدل دیا — لیلۃ القدر جو ہزار مہینوں سے بہتر ہے۔`,
    story: [
      `نبی کریم ﷺ غارِ حراء میں کئی راتیں عبادت میں گوشہ نشین رہتے، یہاں تک کہ حق آپ پر وہیں آ پہنچا: فرشتہ آیا اور کہا: پڑھو۔ آپ نے فرمایا: "میں پڑھنے والا نہیں"، تو اُس نے آپ کو بھینچا یہاں تک کہ آپ سے طاقت نکل گئی پھر چھوڑ دیا: "پڑھو اپنے رب کے نام سے جس نے پیدا کیا"، تو آپ ﷺ کانپتے دل کے ساتھ لوٹے۔`,
      `قرآن نے خود نزول کا زمانہ بیان کیا: "رمضان کا مہینہ جس میں قرآن نازل کیا گیا"، "بے شک ہم نے اسے لیلۃ القدر میں نازل کیا"، تو آغازِ وحی رمضان میں لیلۃ القدر میں تھا، اور اُس کے بعد قرآن واقعات کے مطابق تئیس سال تک نازل ہوتا رہا۔`,
      `اللہ نے اُس رات کی تعیین چھپا دی تاکہ اُسے آخری عشرے اور اُس کی طاق راتوں میں تلاش کیا جائے؛ آپ ﷺ نے فرمایا: "لیلۃ القدر کو رمضان کے آخری عشرے کی طاق راتوں میں تلاش کرو"، تو جو اسے ایمان اور احتساب سے قیام کرے اُس کے پچھلے گناہ بخش دیے جاتے ہیں، اور یہ ہزار مہینوں سے بہتر ہے۔`,
    ],
    source: `صحیح البخاری (بدء الوحی) · سورۃ العلق و سورۃ القدر`,
    disputed: `اُس کا رمضان میں ہونا نصِّ قرآن سے قطعی ہے، البتہ لیلۃ القدر کی تعیین مخفی ہے۔ راجح یہ کہ وہ آخری عشرے کی طاق راتوں میں منتقل ہوتی ہے، اور بہت سوں میں بغیر قطعیت کے 27 مشہور ہے۔`,
  },
  // ————————————————— شوال —————————————————
  'first-eid-fitr': {
    year: `2ھ`,
    title: `اسلام میں پہلی عید الفطر`,
    summary: `نبی کریم ﷺ نے پہلے فرض رمضان کے بعد اسلام کی تاریخ میں پہلی عید الفطر کی نماز مسلمانوں کو پڑھائی، اور وہ ابھی بدر سے فاتح لوٹے تھے، تو اُن کے لیے فتح کی خوشی اور روزے کی تکمیل کی خوشی جمع ہو گئی۔`,
    story: [
      `جب نبی کریم ﷺ مدینہ آئے تو اہلِ مدینہ کے پاس جاہلیت کے دو دن تھے جن میں وہ کھیلتے تھے، تو آپ نے فرمایا: "اللہ نے تمہیں اُن کے بدلے اُن سے بہتر دو دن دیے: یومِ اضحیٰ اور یومِ فطر۔" جب دوسرے سال رمضان فرض ہوا تو پہلی عید اُس کے بعد آئی۔`,
      `یہ ایسی عید تھی جس جیسی مدینہ نے نہ دیکھی تھی: اس سے پہلے روزے کی فرضیت تھی اور اس میں صدقۂ فطر روزہ دار کی طہارت اور مسکینوں کے کھانے کے طور پر فرض ہوا، اور اس سے پہلے بدر کی عظیم فتح تھی، تو نبی کریم ﷺ مسلمانوں کو لے کر عید گاہ نکلے، دو رکعتیں پڑھائیں پھر خطبہ دیا۔`,
      `عید میں آپ ﷺ کی سنت جاری ہوئی: غسل اور بناؤ سنگھار، نکلنے سے پہلے کھجوریں کھانا، بلند آواز سے تکبیر، راستہ بدلنا، اور عورتوں اور بچوں کو عید گاہ لے جانا — ایک مشروع خوشی جس نے عبادت، صلہ رحمی اور مسرت کو جمع کیا۔`,
    ],
    source: `سنن أبی داود (حدیثِ دو دن کے کھیل) · ابن کثیر، البدایہ والنہایہ`,
  },
  'bukhari-death': {
    year: `256ھ`,
    title: `امام بخاری کی وفات`,
    summary: `امیر المؤمنین فی الحدیث محمد بن اسماعیل البخاری — صاحبِ "الجامع الصحیح"، کتاب اللہ کے بعد سب سے صحیح کتاب — عید الفطر کی رات سمرقند کے قریب خرتنک میں، اپنے شہر بخارا سے دور غریب الوطنی میں وفات پا گئے۔`,
    story: [
      `بخاری نے بچپن میں حدیث حفظ کی اور ہزار سے زائد مشایخ کی طرف سفر کیا، اور اپنا صحیح چھ لاکھ احادیث سے سولہ سال میں جمع کیا، اُس میں کوئی حدیث اُس وقت تک نہ رکھتے جب تک غسل کر کے دو رکعت نہ پڑھ لیتے، تو امت نے اسے قبول کیا اور یہ قرآن کے بعد سب سے صحیح کتاب بن گئی۔`,
      `عمر کے آخر میں آپ آزمائے گئے: لفظ کے فتنے کی وجہ سے نیشاپور سے نکالے گئے، پھر بخارا کے امیر نے چاہا کہ آپ اُسے اور اُس کے بیٹوں کو اُس کے گھر میں خاص طور پر حدیث پڑھائیں، تو آپ نے علم کو ذلیل کرنے اور اسے سلاطین کے دروازوں پر لے جانے سے انکار کیا، تو اپنے شہر سے نکالے گئے، اور اللہ سے دعا کی کہ اُنہیں اپنے پاس بلا لے۔`,
      `آپ خرتنک گئے جہاں آپ کے رشتہ دار تھے، تو بیمار ہوئے اور ہفتہ، عید الفطر کی رات 256ھ کو باسٹھ سال سے کچھ کم عمر میں وفات پائی، اور عید کے دن ظہر کی نماز کے بعد وہیں دفن ہوئے۔ آپ کی قبر آج تک سمرقند کے پہلو میں زیارت گاہ ہے۔`,
    ],
    source: `ابن حجر، ہدی الساری · الذہبی، سیر أعلام النبلاء`,
  },
  'khandaq': {
    year: `5ھ`,
    title: `غزوۂ خندق (الاحزاب)`,
    summary: `عرب اور یہود کے احزاب نے دس ہزار کے ساتھ مدینہ کو گھیر لیا، تو مسلمانوں نے سلمان فارسی کے مشورے سے خندق کھودی، اور سردی اور بھوک میں ایک ماہ ثابت قدم رہے یہاں تک کہ اللہ نے کافروں کو اُن کے غیظ سمیت لوٹا دیا کہ اُنہوں نے کوئی بھلائی نہ پائی۔`,
    story: [
      `بنو نضیر کے چند یہود نے قریش، غطفان اور اُن کے حلیفوں کو قریباً دس ہزار میں مدینہ پر جمع کیا، تو سلمان فارسی نے مدینہ کی کھلی جانب کے آگے خندق کھودنے کا مشورہ دیا۔ نبی کریم ﷺ نے سخت بھوک میں صحابہ کے ساتھ اپنے ہاتھ سے اُس میں کام کیا، اور جب وہ پتھر توڑ رہے تھے تو اُنہیں کسریٰ اور قیصر کے خزانوں کا وعدہ دیا۔`,
      `احزاب خندق سے حیران رہ گئے، جو ایسی چال تھی جسے عرب نہ جانتے تھے، اور محاصرہ قریباً ایک ماہ طویل ہوا۔ بنو قریظہ کی اندر سے دغا نے آزمائش شدید کی: "اور دل حلق تک آ گئے"، اور مؤمن ثابت قدم رہے: "یہی ہے جس کا اللہ اور اُس کے رسول نے ہم سے وعدہ کیا تھا۔"`,
      `پھر اللہ نے اُن پر ایک ٹھنڈی تیز آندھی اور ایسے لشکر بھیجے جو تم نے نہ دیکھے، اور نعیم بن مسعود — جو خفیہ اسلام لا چکے تھے — نے احزاب کی صف بندی توڑ دی، تو وہ ناکام لوٹ گئے۔ آپ ﷺ نے فرمایا: "اب ہم اُن پر حملہ کریں گے اور وہ ہم پر حملہ نہ کریں گے"، تو خندق قریش سے کشمکش میں موڑ کا نقطہ بنی۔`,
    ],
    source: `صحیح البخاری · ابن ہشام، السیرہ النبویہ`,
    disputed: `مشہور یہ ہے کہ یہ شوال 5ھ میں ہوا؛ بعض نے 4ھ کہا۔ محاصرہ ذوالقعدہ تک جاری رہا، اور اُس کے دنوں کی قطعی تعیین نہیں۔`,
  },
  'uhud': {
    year: `3ھ`,
    title: `غزوۂ اُحد`,
    summary: `قریش بدر کا بدلہ لینے تین ہزار میں نکلی، تو مسلمان جبلِ اُحد کے پاس اُن سے ٹکرائے؛ پہلے نصرت مسلمانوں کی تھی یہاں تک کہ تیر اندازوں نے نبی کریم ﷺ کے حکم کی خلاف ورزی کی، تو پانسہ پلٹ گیا اور ستر شہید ہوئے جن میں سیدُ الشہداء حمزہ تھے۔`,
    story: [
      `قریش بدر کے انتقام میں اپنے حلیفوں سمیت آ پہنچی، تو نبی کریم ﷺ ایک ہزار کے ساتھ نکلے جن کا ایک تہائی سرِ نفاق ابن ابی کے ساتھ لوٹ گیا۔ آپ نے پچاس تیر اندازوں کو پہاڑی پر کھڑا کیا اور حکم دیا کہ چاہے مسلمان جیتیں یا ہاریں، اپنی جگہ نہ چھوڑیں۔`,
      `دن کے آغاز میں مشرکین بھاگ کھڑے ہوئے، مگر جب تیر اندازوں نے مالِ غنیمت دیکھا تو اکثر اتر آئے، تو خالد بن الولید — جو اُس دن مشرک تھے — پہاڑی کے پیچھے سے پلٹے، صف بکھر گئی، نبی کریم ﷺ کا چہرہ زخمی ہوا اور دندانِ مبارک ٹوٹا، اور شیطان نے پکارا: محمد قتل ہو گئے — یہ ایک سخت گھڑی تھی۔`,
      `ستر شہید ہوئے جن میں حمزہ بن عبد المطلب اور علمبردار مصعب بن عمیر تھے، اور آپ ﷺ ثابت قدم رہے یہاں تک کہ پہاڑ کی طرف ہٹ گئے، اور اُس دن آل عمران کی آیات نازل ہوئیں جو عتاب اور تربیت کرتی ہیں: "اور اللہ نے تم سے اپنا وعدہ سچ کر دکھایا... اور تاکہ اللہ ایمان والوں کو پاک کرے۔" پس اُحد نافرمانی کی قیمت اور ابتلا کے ادب میں امت کا مدرسہ بنا۔`,
    ],
    source: `صحیح البخاری · ابن ہشام، السیرہ النبویہ`,
    disputed: `مشہور یہ ہے کہ ہفتہ 7 شوال 3ھ کو ہوا؛ بعض نے وسطِ شوال کہا۔`,
  },
  'hamra-alasad': {
    year: `3ھ`,
    title: `غزوۂ حمراء الاسد`,
    summary: `اُحد کے زخموں کے اگلے دن کی صبح نبی کریم ﷺ نے پکارا کہ آپ کے ساتھ صرف وہ نکلے جو کل جنگ میں شریک تھا، تو زخمی خود کو گھسیٹتے قریش کے تعاقب میں نکلے یہاں تک کہ حمراء الاسد پہنچے، اور اللہ نے اُن کے دشمن کے دلوں میں رعب ڈال دیا۔`,
    story: [
      `نبی کریم ﷺ کو خبر پہنچی کہ قریش الرَّوحاء میں باہم ملامت کر رہی ہے اور مدینہ کو تہس نہس کرنے لوٹنے کا ارادہ رکھتی ہے، تو آپ نے لوگوں میں دشمن کے تعاقب کا اعلان کیا، اور اُنہیں خاص کیا جو کل اُحد میں حاضر تھے، تو صحابہ اپنے زخموں سمیت خود کو گھسیٹتے نکلے، یہاں تک کہ بعض کو اٹھا کر لے جایا گیا۔`,
      `اُنہی کے بارے میں نازل ہوا: "وہ لوگ جنہوں نے زخم لگنے کے بعد اللہ اور رسول کی پکار پر لبیک کہی، اُن میں سے جنہوں نے احسان کیا اور تقویٰ اختیار کیا اُن کے لیے بڑا اجر ہے"، اور معبد خزاعی اُن کے پاس سے گزرا تو ابو سفیان کے پاس جا کر محمد کے جتھے کو بڑھا چڑھا کر بیان کیا، تو اللہ نے اُن کے دلوں میں رعب ڈال دیا اور وہ مکہ لوٹ گئے۔`,
      `آپ ﷺ حمراء الاسد میں تین دن ٹھہرے، آگ جلاتے تاکہ دشمن اُسے دیکھے، پھر مدینہ لوٹے اور زخموں کے بعد ایک ہی دن کی صبح میں اپنے لشکر کی ہیبت واپس لوٹا دی، تو یہ ایک لازوال سبق بنا کہ کل کی شکست آج کے قیام کو نہیں روکتی۔`,
    ],
    source: `ابن ہشام، السیرہ النبویہ · ابن کثیر، البدایہ والنہایہ`,
  },
  'hunayn': {
    year: `8ھ`,
    title: `غزوۂ حُنین`,
    summary: `فتحِ مکہ کے بعد ہوازن اور ثقیف نے وادیٔ حنین میں اپنے جتھے جمع کیے، تو مسلمان پہلے اپنی کثرت پر خوش ہو کر بکھر گئے، پھر نبی کریم ﷺ اُن کے ساتھ ثابت قدم رہے جو ثابت قدم رہے یہاں تک کہ اللہ نے پانسہ پلٹ دیا اور عظیم نصرت و غنائم ملیں۔`,
    story: [
      `نبی کریم ﷺ فتح کے بعد بارہ ہزار کے ساتھ نکلے، تو بعض نے کہا: آج ہم قلت کی وجہ سے مغلوب نہ ہوں گے! تو ہوازن نے وادیٔ حنین کی گھاٹیوں میں گھات لگائی اور فجر کی دھندلاہٹ میں مسلمانوں پر ایک ہی وار میں تیروں کی بارش کی، تو صفیں بکھر گئیں اور لوگ پیٹھ پھیر گئے۔`,
      `رسول اللہ ﷺ اپنے خچر پر ثابت قدم رہے، فرماتے: "میں نبی ہوں، جھوٹ نہیں؛ میں عبد المطلب کا بیٹا ہوں"، اور عباس بیعتِ شجرہ والوں کو پکارتے رہے، تو مسلمان یوں پلٹے جیسے از سرِ نو، اور اللہ نے اپنی سکینت اور اَن دیکھے لشکر نازل کیے: "اور حنین کے دن جب تمہاری کثرت نے تمہیں خوش کیا مگر تمہارے کچھ کام نہ آئی۔"`,
      `ہوازن شکست کھا گئی اور ہزاروں اونٹ اور بکریاں مالِ غنیمت میں آئیں، جنہیں آپ ﷺ نے فتحِ مکہ کے نو مسلموں میں سے "مؤلفۃ القلوب" میں تقسیم کیا۔ پھر ہوازن کا وفد مسلمان ہو کر آیا تو آپ نے اُن کے قیدی لوٹا دیے، اور حنین کا سبق نکھر آیا: نصرت اللہ سے ہے کثرت سے نہیں، اور دل عطا سے جیتے جاتے ہیں۔`,
    ],
    source: `صحیح مسلم · ابن ہشام، السیرہ النبویہ`,
    disputed: `یہ شوال 8ھ میں فتح کے قریباً دو ہفتے بعد ہوا، مشہور یہ کہ قریباً 10 شوال کو۔`,
  },
  'nur-aldin-death': {
    year: `569ھ`,
    title: `سلطان نور الدین زنکی کی وفات`,
    summary: `عادل بادشاہ نور الدین محمود زنکی — شام و مصر کے متحد کرنے والے، اُس مدرسے کے بانی جس نے صلاح الدین کو جنم دیا، اور جنہوں نے قدس کی آزادی سے برسوں پہلے وعدے پر یقین رکھتے ہوئے اُس کا منبر تیار کرایا — دمشق میں وفات پا گئے۔`,
    story: [
      `نور الدین نے اپنے والد عماد الدین زنکی سے صلیبیوں کے خلاف جہاد کا پرچم ورثے میں پایا، تو حلب اور دمشق کو متحد کیا، پھر اپنے لشکر مصر بھیجے یہاں تک کہ وہ اُن سے مل گیا، اور اپنے سپہ سالار صلاح الدین کے ہاتھوں فاطمی ریاست کو ختم کیا، تو ایک صدی بعد پہلی بار محاذ متحد ہوا۔`,
      `اپنے جہاد کے ساتھ آپ عادل اور زاہد تھے: مدارس، دار الحدیث اور مشہور بیمارستانِ نوری بنائے، اور دار العدل سے رعایا کو انصاف دیا، اور کہا گیا: راشدین کے بعد اسلام کے منبروں پر اُن جیسی سیرت نہ دیکھی گئی، اور آپ نے ایک نفیس منبر بنوانے کا حکم دیا تاکہ فتح کے دن اقصیٰ میں نصب کیا جائے۔`,
      `آپ 11 شوال 569ھ کو دمشق کے قلعے میں وفات پا گئے اِس سے پہلے کہ قدس کی فتح دیکھتے، تو آپ کے شاگرد صلاح الدین نے آپ کے بعد پرچم اٹھایا اور تیرہ سال بعد آپ کا منبر اقصیٰ میں نصب کیا، تو نور الدین بونے والے اور صلاح الدین کاٹنے والے تھے۔`,
    ],
    source: `ابن الأثیر، الکامل فی التاریخ · ابن خلکان، وفیات الأعیان`,
  },
  'taif-siege': {
    year: `8ھ`,
    title: `محاصرۂ طائف`,
    summary: `نبی کریم ﷺ نے حنین کے بعد طائف میں ثقیف کو اُن کے مضبوط قلعے میں قریباً ایک ماہ گھیرا، پھر محاصرہ اٹھا کر دعا کی: "اے اللہ! ثقیف کو ہدایت دے اور اُنہیں لے آ"، تو ایک سال بعد اُن کا وفد بغیر جنگ کے مسلمان ہو کر آیا۔`,
    story: [
      `حنین کے بعد ہوازن اور ثقیف کے بچے کھچے لوگ طائف کے مضبوط قلعے میں پناہ گزین ہوئے جسے اُنہوں نے ایک سال کی خوراک سے بھر رکھا تھا، تو نبی کریم ﷺ نے اُنہیں گھیرا اور قلعے پر منجنیق سے حملہ کیا — جو اسلام میں پہلی بار استعمال ہوئی — اور قلعے کی رمی سے کچھ صحابہ زخمی ہوئے۔`,
      `جب محاصرہ طویل ہوا تو آپ ﷺ نے نوفل بن معاویہ الدیلی سے مشورہ کیا، تو اُنہوں نے کہا: لومڑی بل میں ہے؛ اگر آپ اُس پر رکے رہیں گے تو پکڑ لیں گے، اور چھوڑ دیں گے تو وہ آپ کو نقصان نہ دے گی، تو آپ نے کوچ کا اعلان کیا۔ صحابہ نے کہا: ہم ثقیف پر بددعا کریں، تو آپ نے فرمایا: "اے اللہ! ثقیف کو ہدایت دے اور اُنہیں لے آ۔"`,
      `اللہ نے آپ کی دعا قبول کی؛ ابھی سال نہ گزرا تھا کہ ثقیف کا وفد مدینہ اپنے اسلام کا اعلان کرتے آیا، تو طائف تلوار سے فتح ہوئے بغیر مسلمان ہو گیا، اور اس قصے میں ممکن اور مطلوب کے درمیان توازن کی فقہ تھی، اور دعا کا وہ اثر جہاں لشکر نہیں پہنچتے۔`,
    ],
    source: `ابن ہشام، السیرہ النبویہ · صحیح البخاری`,
    disputed: `محاصرہ شوال 8ھ میں تھا اور قریباً ایک ماہ رہا؛ اُس کے دنوں پر اتفاق نہیں۔`,
  },
  'abu-dawud-death': {
    year: `275ھ`,
    title: `امام ابو داود سجستانی کی وفات`,
    summary: `امام ابو داود سلیمان بن الاشعث — صاحبِ "السنن"، کتبِ ستہ میں سے ایک، جنہوں نے پانچ لاکھ احادیث سے چار ہزار آٹھ سو احادیث منتخب کیں جو احکام کی احادیث کو جمع کرتی ہیں — بصرہ میں وفات پا گئے۔`,
    story: [
      `ابو داود 202ھ میں سجستان میں پیدا ہوئے اور شہروں کی طرف سفر کیا اور احمد بن حنبل و اُن کے طبقے سے علم لیا۔ اُنہوں نے اپنی کتاب "السنن" اُن پر پیش کی تو اُنہوں نے پسند فرمائی، اور ابو داود نے کہا: میں نے اُس میں صحیح، اُس جیسی اور اُس کے قریب حدیثیں ذکر کیں، اور جس میں سخت کمزوری تھی اُسے واضح کر دیا۔`,
      `اُنہوں نے فتنۂ زنج کے بعد بصرہ کا رخ کیا تاکہ اسے علم سے آباد کریں۔ اُن سے کہا گیا: مجتہد کے لیے آپ کی کتاب میں سے چار حدیثیں کافی ہیں: "اعمال کا دار و مدار نیتوں پر ہے"، "آدمی کے حسنِ اسلام میں سے ہے کہ وہ بے مقصد چیز کو چھوڑ دے"، "کوئی مؤمن اُس وقت تک مؤمن نہیں جب تک اپنے بھائی کے لیے وہی پسند نہ کرے جو اپنے لیے کرتا ہے"، اور "حلال واضح ہے اور حرام واضح ہے۔"`,
      `ابراہیم الحربی نے اُن کے بارے میں کہا: ابو داود کے لیے حدیث ایسے نرم کر دی گئی جیسے داود کے لیے لوہا نرم کیا گیا۔ آپ بصرہ میں 16 شوال 275ھ کو وفات پائے، اور اُن کی سنن آج تک احکام کی احادیث میں فقہاء کا مرجع ہے۔`,
    ],
    source: `الذہبی، سیر أعلام النبلاء · الخطابی، معالم السنن (مقدمہ)`,
  },
  'tabari-death': {
    year: `310ھ`,
    title: `امام طبری کی وفات`,
    summary: `مفسرین اور مؤرخین کے امام محمد بن جریر الطبری — صاحبِ "جامع البیان" فی التفسیر اور "تاریخ الرسل والملوک" — بغداد میں وفات پا گئے، جن کے بارے میں کہا گیا: اگر کوئی اُن کی تفسیر حاصل کرنے چین کا سفر کرے تو زیادہ نہ ہوگا۔`,
    story: [
      `طبری طبرستان کے آمل میں 224ھ میں پیدا ہوئے، سات سال میں قرآن حفظ کیا، اور طلبِ علم میں رے سے بغداد، بصرہ، کوفہ، شام اور مصر تک سفر کیا، یہاں تک کہ اُن کے پاس علوم کا وہ ذخیرہ جمع ہوا جو اُن کے عہد کے کسی کے پاس نہ تھا، اور وہ ہر دن چالیس ورق لکھتے تھے۔`,
      `اُنہوں نے "جامع البیان عن تأویل آی القرآن" لکھی جو مأثور تفاسیر کی ماں اور بعد والوں کا مرجع بنی، اور "تاریخ الرسل والملوک" جو صدرِ اسلام کی تاریخ کا معتبر ترین مرجع بنی، اور اُن کی "تہذیب الآثار" ہے، اور ایک اجتہادی فقہی مذہب تھا جو اُن کے بعد مٹ گیا۔`,
      `وہ قریباً اسّی سال علم و تصنیف کے لیے یکسو، بغیر شادی کے رہے، اور اُنہیں قضا و مظالم پیش کیے گئے تو انکار کیا، اور بغداد میں شوال 310ھ کو وفات پائی، اور اپنے گھر میں رحبۃ یعقوب میں دفن ہوئے، اور لوگ کئی دن اُن کے جنازے پر امنڈتے اور اُن کی قبر پر نماز پڑھتے رہے۔`,
    ],
    source: `ابن خلکان، وفیات الأعیان · الذہبی، سیر أعلام النبلاء`,
    disputed: `مشہور یہ ہے کہ آپ ہفتہ 26 شوال 310ھ کو وفات پائے اور اتوار کو دفن ہوئے؛ بعض مصادر میں 27 ہے۔`,
  },
  // ————————————————— ذوالقعدہ —————————————————
  'umrat-alqada': {
    year: `7ھ`,
    title: `عمرۃ القضاء`,
    summary: `نبی کریم ﷺ صلحِ حدیبیہ کی ایک شق کے نفاذ میں دو ہزار تلبیہ کہتے مسلمانوں کے ساتھ عمرہ کرنے مکہ میں داخل ہوئے، اِس کے بعد کہ پچھلے سال روک دیے گئے تھے، اور تین دن اپنا عمرہ پورا کیا جبکہ قریش پہاڑوں کی چوٹیوں سے دیکھتی رہی۔`,
    story: [
      `جب قریش نے حدیبیہ کے سال نبی کریم ﷺ کو عمرے سے روکا، تو صلح کی شرائط میں تھا کہ مسلمان اگلے سال عمرہ کریں اور مکہ اُن کے لیے تین دن خالی کر دیا جائے، تو آپ ﷺ ذوالقعدہ 7ھ میں اُن دو ہزار کے ساتھ نکلے جو حدیبیہ میں شریک تھے، اور دغا کے اندیشے سے ہتھیار ساتھ تھے — جنہیں اُنہوں نے حرم کے باہر چھوڑ دیا۔`,
      `آپ ﷺ اپنی اونٹنی القصواء پر مکہ میں داخل ہوئے، عبد اللہ بن رواحہ اُس کی نکیل تھامے تھے، اور مسلمان کعبہ کے گرد تلبیہ کہہ رہے تھے، اور آپ نے اُنہیں حکم دیا کہ پہلے تین چکروں میں تیز چلیں (رمل کریں) تاکہ مشرکوں کو اپنی قوت دکھائیں، جنہوں نے کہا تھا: تمہارے پاس ایسی قوم آ رہی ہے جسے یثرب کے بخار نے کمزور کر دیا ہے۔`,
      `آپ تین دن ٹھہرے اور اُس میں امہات المؤمنین میں سے آخری میمونہ بنت الحارث سے شادی کی، پھر شرط کی وفا میں نکل گئے، اور اس عمرے کا اہلِ مکہ کے دلوں پر گہرا اثر ہوا کہ اُنہوں نے اسلام کی عزت اور اُس کے اہل کا سکون دیکھا، تو چند ہی ماہ میں خالد اور عمرو بن العاص اسلام لے آئے۔`,
    ],
    source: `صحیح البخاری · ابن ہشام، السیرہ النبویہ`,
    disputed: `آپ اِس کے لیے بالاتفاق ذوالقعدہ 7ھ میں نکلے — اور یہی آپ ﷺ کے تمام عمروں کا مہینہ ہے — دنِ روانگی کے ضبط کے بغیر۔`,
  },
  'banu-qurayza': {
    year: `5ھ`,
    title: `غزوۂ بنو قریظہ`,
    summary: `نبی کریم ﷺ کے خندق سے لوٹتے ہی جبریل نے آپ کو بنو قریظہ کی طرف کوچ کا حکم دیا جنہوں نے عہد توڑا اور مدینہ کی نازک ترین گھڑیوں میں دغا کی، تو آپ نے اُنہیں گھیرا یہاں تک کہ وہ سعد بن معاذ کے فیصلے پر اترے۔`,
    story: [
      `بنو قریظہ اور نبی کریم ﷺ کے درمیان مدینہ کے مشترکہ دفاع کا عہد تھا، جسے اُنہوں نے خندق کی سخت ترین گھڑیوں میں توڑا اور اندر سے مسلمانوں پر وار کا ارادہ کیا، تو جب احزاب لوٹ گئے، جبریل دوپہر کو آئے: کیا تم نے ہتھیار رکھ دیے؟ فرشتوں نے تو نہیں رکھے، بنو قریظہ کی طرف اٹھو۔`,
      `تو آپ ﷺ نے پکارا: "کوئی عصر نہ پڑھے مگر بنو قریظہ میں"، اور اُنہیں پچیس راتیں گھیرا یہاں تک کہ وہ اپنے پرانے حلیف سعد بن معاذ کے فیصلے پر اترے، جو خندق سے زخمی تھے، تو اُنہوں نے اُن میں غداروں کے بارے میں خود تورات ہی کے حکم سے فیصلہ کیا۔`,
      `آپ ﷺ نے فیصلہ نافذ کیا اور فرمایا: "تم نے اُن میں بادشاہ کے حکم کے مطابق فیصلہ کیا"، اور یوں مدینہ اندرونی دغا سے پاک ہوا اور اُس کا پچھلا محاذ محفوظ ہوا۔ پھر سعد اپنے زخم سے وفات پا گئے تو اُن کی وفات پر رحمٰن کا عرش ہل گیا جیسا کہ حدیث میں صحیح ہے۔`,
    ],
    source: `صحیح البخاری و مسلم · ابن ہشام، السیرہ النبویہ`,
    disputed: `یہ خندق کے فوراً بعد ذوالقعدہ 5ھ میں تھا؛ محاصرہ اوائلِ ذوالحجہ تک بڑھا، اور اُس کے دنوں کی قطعی تعیین نہیں۔`,
  },
  'hudaybiyya': {
    year: `6ھ`,
    title: `صلحِ حدیبیہ اور بیعتِ رضوان`,
    summary: `نبی کریم ﷺ عمرہ کرنے نکلے تو قریش نے روک دیا، تو آپ کے صحابہ نے درخت کے نیچے موت پر آپ کی بیعت کی، پھر وہ صلح ہوئی جس کا ظاہر تنگی اور باطن فتح تھا، اور اللہ نے اسے فتحِ مبین کا نام دیا۔`,
    story: [
      `آپ ﷺ ذوالقعدہ 6ھ میں چودہ سو کے ساتھ عمرہ کے لیے نکلے، جنگ کا ارادہ نہ تھا، مگر قریش نے اُنہیں حدیبیہ پر روک دیا، اور جب آپ کے قاصد عثمان بن عفان کے قتل کی افواہ اڑی تو آپ نے بیعت کی دعوت دی، تو اُنہوں نے درخت کے نیچے بھاگ نہ جانے پر آپ کی بیعت کی، تو اللہ نے نازل کیا: "بے شک اللہ مؤمنوں سے راضی ہو گیا جب وہ درخت کے نیچے آپ کی بیعت کر رہے تھے۔"`,
      `پھر سہیل بن عمرو آیا تو دس سال جنگ بند رکھنے پر صلح ہوئی، اور یہ کہ مسلمان اُس سال لوٹ جائیں اور اگلے سال عمرہ کریں، اور ایک شرط جو مسلمانوں پر بھاری تھی: جو قریش میں سے مسلمان ہو کر محمد کے پاس آئے اُسے واپس کر دیا جائے — یہاں تک کہ عمر نے کہا: ہم اپنے دین میں دباؤ کیوں قبول کریں؟`,
      `واپسی کے راستے میں سورۃ الفتح نازل ہوئی: "بے شک ہم نے آپ کو کھلی فتح عطا کی"، اور اللہ نے سچ فرمایا؛ لوگ مامون ہوئے تو باہم ملے جلے، تو دو سال میں اُتنے لوگ اسلام میں داخل ہوئے جتنے اُس سے پہلے، اور یہ صلح خود فتحِ مکہ کا مقدمہ بنی۔`,
    ],
    source: `صحیح البخاری (کتاب الشروط) · ابن ہشام، السیرہ النبویہ`,
    disputed: `یہ بالاتفاق ذوالقعدہ 6ھ میں تھا؛ صلح حدیبیہ میں قیام کے آخری دنوں میں ہوئی، اور اُس کے دن کی قطعی تعیین نہیں۔`,
  },
  'qutuz-death': {
    year: `658ھ`,
    title: `سلطان قطز کا قتل`,
    summary: `عین جالوت کے ہیرو سلطان المظفر سیف الدین قطز فاتحانہ قاہرہ لوٹتے ہوئے دھوکے سے قتل کر دیے گئے، اپنی لازوال فتح کے دو ماہ سے بھی کم بعد، تو اُن کے بعد بیبرس نے سلطنت سنبھالی۔`,
    story: [
      `عین جالوت اور شام کو مغلوں سے پاک کرنے کے بعد قطز مصر لوٹے تاکہ فاتحین کی طرح داخل ہوں، اور راستے میں مشرقی ڈیلٹا میں الصالحیہ کے قریب چند امراء کے ساتھ شکار کو نکلے۔`,
      `اُن کے اور بیبرس اور کچھ امراء کے درمیان وعدوں اور جاگیروں کی وجہ سے رنجش تھی — بعض نے فارس الدین اقطای کے قتل کی پرانی ثارات کہا — تو اُنہوں نے 16 ذوالقعدہ 658ھ کو اُنہیں قتل کر دیا، اور اُن کی وفات اور اُن کی عظیم فتح کے درمیان صرف قریباً پچاس دن کا فاصلہ تھا۔`,
      `امراء نے بیبرس کی سلطنت پر بیعت کی، تو وہ — اپنی تولیت کے المیے کے باوجود — جہاد اور تعمیر میں اسلام کے عظیم ترین سلاطین میں سے بنے، اور قطز امت کی یاد میں ایک ہیرو کے طور پر باقی رہے جس نے اُسے اُس کی تاریک ترین گھڑی میں بچایا اور اپنے عروج پر شہید ہوا۔`,
    ],
    source: `المقریزی، السلوک · ابن تغری بردی، النجوم الزاہرہ`,
  },
  'manzikert': {
    year: `463ھ`,
    title: `معرکۂ ملاذکرد`,
    summary: `سلجوقی سلطان الپ ارسلان نے قریباً بیس ہزار کے ساتھ بازنطینی بادشاہ رومانوس کے دو لاکھ سے زائد لشکر کو شکست دی، اور خود بادشاہ کو قید کر لیا، تو اناطولیہ اسلام اور ترکوں کے لیے کھل گیا۔`,
    story: [
      `رومانوس چہارم نے سلجوقیوں کو جڑ سے اکھاڑنے اور ارمینیہ کی بازیابی کے لیے ایک بھاری لشکر جمع کیا، تو الپ ارسلان نے جھیلِ وان کے شمال میں ملاذکرد کے قریب چند سواروں کے ساتھ اُس کا سامنا کیا اور صلح پیش کی، جسے بادشاہ نے اپنے جتھوں پر نازاں ہو کر ٹھکرا دیا۔`,
      `سلطان نے جمعہ کے دن سفید لباس پہنا اور حنوط لگایا اور کہا: اگر میں قتل ہوا تو یہ میرا کفن ہے، اور لشکر کو نماز پڑھائی اور خطباء نے — خلیفہ القائم بأمر اللہ کی تدبیر سے — منبروں پر مسلمانوں کے لیے دعا کی، پھر ترکوں کے کر و فر کے طریقے سے حملہ کیا یہاں تک کہ بازنطینی لشکر پارہ پارہ ہو گیا اور رومانوس قید ہو گیا۔`,
      `یہ پہلی بار تھا کہ مسلمانوں سے جنگ میں کوئی بازنطینی بادشاہ قید ہوا؛ الپ ارسلان نے اُس کی تکریم کی، فدیہ لے کر عہد کیا، اور اُس کے بعد اناطولیہ ترکمانوں کی ہجرتوں کے لیے کھل گیا، تو سلاجقۂ روم پھر آلِ عثمان قائم ہوئے، اور ملاذکرد سے قسطنطنیہ کا راستہ شروع ہوا۔`,
    ],
    source: `ابن الأثیر، الکامل فی التاریخ · سبط ابن الجوزی، مرآۃ الزمان`,
    disputed: `یہ ذوالقعدہ 463ھ (اگست 1071ء) کے جمعہ کو ہوا؛ مراجع تحویلِ تاریخ میں تقریباً 20 ذوالقعدہ ذکر کرتے ہیں۔`,
  },
  'ibn-taymiyya-death': {
    year: `728ھ`,
    title: `شیخ الإسلام ابن تیمیہ کی وفات`,
    summary: `احمد بن عبد الحلیم ابن تیمیہ دمشق کے قلعے میں قید کی حالت میں وفات پا گئے، اِس کے بعد کہ اُن سے کاغذ و قلم چھین لیا گیا تھا، تو پورا دمشق اُن کے جنازے میں نکل آیا یہاں تک کہ کہا گیا: صرف معذور پیچھے رہا، اور علم و جہاد سے دنیا کو بھر دینے والی ایک زندگی مکمل ہوئی۔`,
    story: [
      `ابن تیمیہ 661ھ میں حرّان میں پیدا ہوئے، اور اُن کے اہلِ خانہ مغلوں کی یلغار کے سامنے اُنہیں لے کر دمشق ہجرت کر گئے، تو آپ علوم میں یہاں تک ماہر ہوئے کہ بیس سال سے پہلے فتویٰ دیا اور پڑھایا، اور علم کے فنون کا وہ ذخیرہ جمع کیا جس نے ہم عصروں کو حیران کیا۔ اُن کے شاگرد الذہبی نے کہا: گویا سنت اُن کی آنکھوں کے سامنے تھی۔`,
      `آپ مغلوں کے سامنے اُس دن کھڑے ہوئے جب بہت سے بھاگ گئے، اور غازان کا رو در رو سامنا کیا، اور شقحب کے دن لوگوں کو ثابت کیا اور اُنہیں افطار کا فتویٰ دیا، اور بدعتوں کے سامنے اپنی زبان و قلم سے جہاد کیا، تو "منہاج السنہ"، "درء التعارض" اور "الفتاویٰ" لکھیں جو دسیوں مجلدات میں جمع ہوئیں۔`,
      `آپ بارہا آزمائے گئے اور مصر و شام میں قید ہوئے، اور فرماتے: میرے دشمن میرا کیا بگاڑ سکتے ہیں؟ میری جنت اور باغ میرے سینے میں ہے۔ عمر کے آخر میں ایک فتوے کی وجہ سے دمشق کے قلعے میں قید ہوئے، تو جب لکھنے سے روک دیے گئے تو پڑھتے اور عبادت کرتے رہے یہاں تک کہ 20 ذوالقعدہ 728ھ کی رات وفات پائی، اور اُن کے جنازے میں بے شمار خلق شریک ہوئی۔`,
    ],
    source: `ابن کثیر، البدایہ والنہایہ · ابن عبد الہادی، العقود الدریہ`,
  },
  'ibn-alnafis-death': {
    year: `687ھ`,
    title: `ابن النفیس، دورانِ خونِ صغیر کے دریافت کنندہ کی وفات`,
    summary: `علامہ طبیب علاء الدین ابن النفیس — جنہوں نے یورپیوں سے چار صدیاں پہلے پھیپھڑوں کی دورانِ خون بیان کی — قاہرہ میں وفات پا گئے، اور اپنا گھر اور کتابیں بیمارستانِ منصوری کے لیے وقف کیں۔`,
    story: [
      `ابن النفیس دمشق میں قریباً 607ھ میں پیدا ہوئے اور بیمارستانِ نوری میں طب سیکھی، پھر قاہرہ منتقل ہو کر اُس کے اطباء کے سربراہ ہوئے اور بیمارستانِ ناصری پھر منصوری میں کام کیا، اور طب کے ساتھ فقہِ شافعی، اصول اور منطق کو جمع کیا۔`,
      `"شرح تشریح القانون" میں اُنہوں نے جالینوس اور ابن سینا کی مخالفت کی جو کہتے تھے کہ خون دائیں بطن سے حجاب میں مساموں کے ذریعے بائیں کی طرف جاتا ہے، اور مقرر کیا کہ خون دائیں بطن سے پھیپھڑے کی طرف جاتا ہے، اُس کی ہوا میں ملتا ہے پھر بائیں کی طرف لوٹتا ہے — یہی دورانِ خونِ رئوی کا وصف ہے جس تک یورپی صدیوں بعد پہنچے۔`,
      `اُن کی "الشامل فی الصناعۃ الطبیہ" ہے جسے تین سو مجلدات میں منصوبہ بنایا، اور "الموجز فی القانون" جسے اطباء نے صدیوں تک استعمال کیا۔ جب وفات کا وقت آیا تو دوا کے طور پر شراب پینے سے انکار کیا اور کہا: میں اللہ سے اِس حال میں نہ ملوں گا کہ میرے پیٹ میں اُس کا کچھ ہو، اور قاہرہ میں ذوالقعدہ 687ھ کو وفات پائی۔`,
    ],
    source: `الصفدی، الوافی بالوفیات · ابن أبی أصیبعہ، عیون الأنباء`,
    disputed: `مشہور یہ ہے کہ آپ 21 ذوالقعدہ 687ھ کو وفات پائے؛ بعض مصادر میں دن میں معمولی اختلاف ہے۔`,
  },

  // ————————————————— ذوالحجہ —————————————————
  'hajjat-alwadaa': {
    year: `10ھ`,
    title: `حجۃ الوداع — یومِ ترویہ`,
    summary: `یومِ ترویہ کو نبی کریم ﷺ اپنے ایک لاکھ صحابہ کے ساتھ اپنے واحد حج میں مکہ سے منیٰ کی طرف روانہ ہوئے، جس میں آپ نے امت کو اُس کے مناسک سکھائے اور فرمایا: "مجھ سے اپنے مناسک لے لو"، اور اُس میں امت کو الوداع کہا۔`,
    story: [
      `نبی کریم ﷺ نے اپنے حج کا اعلان کیا تو لوگ ہر طرف سے مدینہ امنڈ آئے، اور آپ اواخرِ ذوالقعدہ 10ھ میں اُن کے ساتھ نکلے، یہاں تک کہ جب ذوالحجہ کی آٹھ تاریخ — یومِ ترویہ — آئی تو آپ اپنے ساتھیوں سمیت مکہ سے منیٰ گئے، وہاں پانچوں نمازیں پڑھیں اور رات گزاری۔`,
      `آپ کے ساتھ قریباً ایک لاکھ یا زائد تھے، سب آپ کی ہر حرکت و سکون میں اقتدا کرتے، آپ کے تلبیہ اور نسک کو دیکھتے، اور آپ فرماتے: "مجھ سے اپنے مناسک لے لو، شاید میں اپنے اِس سال کے بعد تم سے نہ ملوں"، تو یہ بلاغ، تعلیم اور وداع کا حج تھا۔`,
      `آپ ﷺ نے وہ مناسک ترتیب دیے جن پر مسلمان آج تک ہیں: منیٰ، پھر عرفہ، پھر مزدلفہ، رمیِ جمار، قربانی اور طواف، اور آپ سوال و جواب کرتے کھڑے رہے: "کر لو، کوئی حرج نہیں"، تو آپ کا حج قیامت تک ہر حاجی کے لیے لازوال نمونہ رہا۔`,
    ],
    source: `صحیح مسلم (جابر کی طویل حدیث در صفتِ حجِ نبی ﷺ)`,
  },
  'arafat-sermon': {
    year: `10ھ`,
    title: `خطبۂ حجۃ الوداع اور ﴿الیوم أکملت لکم دینکم﴾ کا نزول`,
    summary: `نبی کریم ﷺ عرفہ میں اُس عظیم ترین اجتماع کے سامنے خطیب بن کر کھڑے ہوئے جو جزیرہ نما نے دیکھا، تو خون اور مال کی حرمت مقرر کی، جاہلیت کے سود اور خون ختم کیے، عورتوں کے بارے میں وصیت کی، تبلیغ پر اللہ کو گواہ بنایا، اور اکمالِ دین کی آیت نازل ہوئی۔`,
    story: [
      `آپ ﷺ نے یومِ عرفہ لوگوں کو اپنی اونٹنی پر خطبہ دیا اور فرمایا: "بے شک تمہارے خون اور تمہارے مال تم پر ایسے ہی حرام ہیں جیسے تمہارے اِس دن کی، اِس مہینے میں، اِس شہر میں حرمت ہے"، اور جاہلیت کا سارا سود ختم کیا اور پہلا سود جو ختم کیا وہ اپنے چچا عباس کا تھا، اور اُس کے خون، اور پہلا خون جو ختم کیا وہ ابن ربیعہ کا تھا۔`,
      `اور عورتوں کے بارے میں بھلائی کی وصیت کی: "عورتوں کے بارے میں اللہ سے ڈرو، کیونکہ تم نے اُنہیں اللہ کی امان سے لیا ہے"، اور مقرر کیا کہ مسلمان مسلمان کا بھائی ہے، اور کسی عربی کو عجمی پر تقویٰ کے سوا فضیلت نہیں، اور فرمایا: "میں تم میں وہ چیز چھوڑے جا رہا ہوں جس کے بعد اگر تم اُسے تھامے رکھو تو کبھی گمراہ نہ ہو گے: کتاب اللہ"، پھر فرمایا: "کیا میں نے پہنچا دیا؟" اُنہوں نے کہا: ہاں، فرمایا: "اے اللہ! گواہ رہ۔"`,
      `اور اُس دن کی شام نازل ہوا: "آج میں نے تمہارے لیے تمہارا دین مکمل کر دیا اور تم پر اپنی نعمت پوری کر دی اور تمہارے لیے اسلام کو دین کے طور پر پسند کیا۔" عمر رو پڑے اور کہا: کمال کے بعد نقصان ہی ہے، آپ ﷺ کے قریب آتے وقت کو محسوس کرتے ہوئے؛ اور ایسا ہی ہوا؛ آپ اُس کے قریباً اسّی راتوں بعد وفات پا گئے۔`,
    ],
    source: `صحیح مسلم (حدیثِ جابر) · صحیح البخاری (نزولِ آیۃ الیوم أکملت)`,
  },
  'first-eid-adha': {
    year: `2ھ`,
    title: `اسلام میں پہلی عید الاضحیٰ`,
    summary: `نبی کریم ﷺ نے مدینہ میں مسلمانوں کو پہلی عید الاضحیٰ کی نماز پڑھائی اور دو چتکبرے سینگوں والے مینڈھے قربان کیے جنہیں اپنے ہاتھ سے ذبح کیا، ملتِ ابراہیم کو زندہ کرتے ہوئے اور ایک ایسی سنت جو قیامت تک امت میں باقی ہے۔`,
    story: [
      `ہجرت کے دوسرے سال عیدین کی نماز اور قربانی مشروع ہوئی، تو آپ ﷺ یومِ نحر عید گاہ نکلے، لوگوں کو دو رکعتیں پڑھائیں پھر خطبہ دیا اور جس نے ذبح نہ کیا تھا اُسے نماز کے بعد ذبح کا حکم دیا، اور فرمایا: "جس نے نماز سے پہلے ذبح کیا تو وہ صرف گوشت ہے جو اُس نے اپنے گھر والوں کے لیے پیش کیا۔"`,
      `اور آپ ﷺ نے دو چتکبرے سینگوں والے مینڈھے قربان کیے، اُنہیں اپنے دستِ مبارک سے ذبح کیا، بسم اللہ اور تکبیر کہی اور اپنا قدم اُن کے پہلوؤں پر رکھا، جیسا کہ انس نے صحیحین میں روایت کیا، اپنے باپ ابراہیم کی سنت کو زندہ کرتے ہوئے جب اللہ نے اُن کے بیٹے اسماعیل کو ایک عظیم ذبیحہ سے فدیہ دیا۔`,
      `اور یومِ نحر سال کے سب سے بڑی حرمت والا دن بن گیا؛ آپ ﷺ نے اسے "یومُ الحج الأکبر" کا نام دیا، اُس میں مسلمانوں کے لیے دو نسک جمع ہوتے ہیں: عید کی نماز اور قربانی، اور اللہ کے گھر کے حاجیوں کے لیے اُس میں رمیِ جمرہ، نحر، حلق اور طواف جمع ہوتے ہیں۔`,
    ],
    source: `صحیح البخاری و مسلم (احادیثِ قربانی و نمازِ عید)`,
  },
  'aqaba-pledge': {
    year: `13 نبوی`,
    title: `بیعتِ عقبۂ ثانیہ`,
    summary: `انصار کے تہتر مرد اور دو عورتوں نے ایامِ تشریق کی راتوں میں منیٰ کے شعبِ عقبہ میں رسول اللہ ﷺ کی خفیہ بیعت کی، اِس پر کہ آپ کی حفاظت ایسے کریں گے جیسے اپنی جانوں اور اہل کی۔ یہ بیعت ہجرت اور قیامِ ریاست کا دروازہ بنی۔`,
    story: [
      `اِس کے بعد کہ خزرج کے چند لوگ پچھلے موسم میں اسلام لا چکے تھے اور یثرب میں اسلام کی چنگاری پھر بھڑک اٹھی، بعثت کے تیرہویں سال کے موسم میں تہتر مرد اور دو عورتیں آئیں، تو نبی کریم ﷺ نے اُنہیں ایامِ تشریق کے وسط میں رات کو شعبِ عقبہ میں ملنے کا وعدہ دیا، اور وہ اپنے خیموں سے قطا (پرندے) کی طرح چپکے سے نکلے۔`,
      `نبی کریم ﷺ کے چچا عباس اپنے بھتیجے کی ضمانت کے لیے حاضر ہوئے، تو قوم نے کہا: اپنے رب اور اپنے لیے جو چاہیں لیں۔ آپ نے اللہ کے لیے صرف اُس کی عبادت، اور اپنے اور اپنے صحابہ کے لیے نصرت و حفاظت کی شرط رکھی۔ اُنہوں نے کہا: اگر ہم نے وفا کی تو ہمارے لیے کیا؟ فرمایا: "جنت"، اُنہوں نے کہا: اپنا ہاتھ بڑھائیں — اور اُنہوں نے بیعت کر لی۔`,
      `اُن میں سے ایک نے کہا: اللہ کی قسم! اگر آپ چاہیں تو ہم کل اہلِ منیٰ پر اپنی تلواروں سے ٹوٹ پڑیں۔ آپ ﷺ نے فرمایا: "ہمیں اِس کا حکم نہیں دیا گیا"، اور اُن میں سے بارہ نقیب چنے۔ چند ہی ماہ گزرے کہ آپ نے اپنے صحابہ کو انصار کے دیار کی طرف ہجرت کی اجازت دی، تو عقبۂ ثانیہ ریاست کی عمارت کی پہلی اینٹ بنی۔`,
    ],
    source: `ابن ہشام، السیرہ النبویہ · مسند الإمام أحمد`,
    disputed: `یہ بعثت کے تیرہویں سال ایامِ تشریق (11-13 ذوالحجہ) میں رات کو تھی؛ مشہور یہ کہ ایامِ تشریق کے وسط کی رات۔`,
  },
  'uthman-martyrdom': {
    year: `35ھ`,
    title: `عثمان بن عفان رضی اللہ عنہ کی شہادت`,
    summary: `باغیوں نے چالیس دن کے محاصرے کے بعد بوڑھے خلیفہ عثمان بن عفان کے گھر پر دھاوا بول کر اُنہیں روزے کی حالت میں قرآن پڑھتے ہوئے شہید کر دیا۔ اُنہوں نے انکار کیا کہ اُن کی حفاظت میں کسی مسلمان کا خون بہایا جائے، تو اُن کی شہادت آج تک فتنے کا دروازہ بنی۔`,
    story: [
      `شہروں سے جتھے، جنہیں طعنہ زنوں نے بھڑکایا، مدینہ آئے اور عثمان کے گھر کا محاصرہ کر کے اُن پر پانی روک دیا — وہی جنہوں نے مسلمانوں کے لیے بئرِ رومہ خریدا تھا۔ صحابہ نے اُن کے دفاع میں جنگ کی پیش کش کی مگر آپ نے انکار کیا اور اُنہیں رکنے کی قسم دی، اور کہا: میں رسول اللہ کے بعد اُن کی امت میں خون بہا کر سب سے پہلا نہ بنوں گا۔`,
      `اور اُنہیں نبی کریم ﷺ کے یومِ حراء کے وہ الفاظ یاد دلائے جب آپ نے اُنہیں ایک آنے والی آزمائش پر جنت کی بشارت دی، اور کہا: میں نے رسول اللہ کو فرماتے سنا: "کسی مسلمان کا خون تین باتوں میں سے ایک کے سوا حلال نہیں"، اور اللہ کی قسم میں نے اُن میں سے کوئی کام نہ کیا۔`,
      `اور جمعہ 18 ذوالحجہ 35ھ کو لوگوں نے اُن پر دیوار پھلانگی اور اُنہیں روزے کی حالت میں مصحف پڑھتے ہوئے قتل کر دیا، اور اُن کا خون اللہ کے اِس فرمان پر ٹپکا: "پس عنقریب اللہ اُن سے تمہاری کفایت کرے گا، اور وہ سننے والا جاننے والا ہے۔" آپ بقیع میں دفن ہوئے، اور اُن کے قتل سے وہ فتنہ اٹھا جس کے بارے میں نبی کریم ﷺ نے اُس سے دہائیوں پہلے عثمان سے کہا تھا: "تم ثابت رہنا یہاں تک کہ مجھ سے آ ملو۔"`,
    ],
    source: `الطبری، تاریخ الرسل والملوک · الذہبی، سیر أعلام النبلاء`,
  },
  'umar-stabbing': {
    year: `23ھ`,
    title: `امیر المؤمنین عمر بن الخطاب پر حملہ`,
    summary: `مجوسی ابو لؤلؤہ نے امیر المؤمنین عمر بن الخطاب کو زہر آلود خنجر سے وار کیا جبکہ آپ لوگوں کو فجر پڑھا رہے تھے، تو آپ نے چند دن اپنے زخم برداشت کیے جن میں خلافت کو چھ کی شوریٰ میں رکھا، پھر اپنے دونوں ساتھیوں سے جا ملے اور اُن کے ساتھ دفن ہوئے۔`,
    story: [
      `عمر دعا کیا کرتے: اے اللہ! مجھے اپنے راستے میں شہادت عطا کر اور میری موت اپنے رسول کے شہر میں کر۔ اللہ نے آپ کی دعا حیرت انگیز طور پر قبول کی: مغیرہ کے غلام ابو لؤلؤہ فیروز نے، بلادِ فارس کی فتح پر کینے سے، آپ کو محرابِ فجر میں چھ وار کیے، اور آپ کے ساتھ تیرہ آدمیوں کو زخمی کیا۔`,
      `عمر کو نبیذ پلائی گئی تو وہ اُن کے زخم سے نکلی، پھر دودھ تو وہ بھی زخم سے نکلا، تو آپ نے جان لیا کہ آپ کی موت ہے، اور پوچھنے لگے: مجھے کس نے قتل کیا؟ جب کہا گیا: ابو لؤلؤہ نے، تو فرمایا: اُس اللہ کا شکر ہے جس نے میری موت ایسے شخص کے ہاتھ نہ کی جو اسلام کا دعویٰ کرتا ہو۔`,
      `اور اُنہوں نے عائشہ سے اپنے دونوں ساتھیوں کے ساتھ دفن ہونے کی اجازت مانگی تو اُنہوں نے دی اور کہا: میں اسے اپنے لیے چاہتی تھی، مگر آج اُنہیں اپنے آپ پر ترجیح دیتی ہوں۔ اور معاملہ اُن چھ کی شوریٰ میں رکھا جن سے رسول اللہ ﷺ اپنی وفات کے وقت راضی تھے، اور حملے کے تین دن بعد وفات پائی، تو حجرۂ شریفہ میں تیسرے فرد کے طور پر دفن ہوئے۔`,
    ],
    source: `صحیح البخاری (عمر کے قتل کا مکمل قصہ) · الطبری، تاریخ الرسل والملوک`,
    disputed: `آپ پر بدھ کے دن ذوالحجہ 23ھ کی چار راتیں باقی رہتے (مشہور قول کے مطابق 26 کو) وار ہوا، اور اُس کے تین دن بعد وفات پائی، اور مطلعِ محرم 24ھ میں دفن ہوئے۔`,
  },
  'ibn-hajar-death': {
    year: `852ھ`,
    title: `حافظ ابن حجر عسقلانی کی وفات`,
    summary: `امیر المؤمنین فی الحدیث احمد بن علی بن حجر العسقلانی — صاحبِ "فتح الباری" شرحِ صحیح البخاری — قاہرہ میں وفات پا گئے، اور اُن کا جنازہ بارش میں سلطان، خلیفہ اور دسیوں ہزار کے شرکت کے ساتھ اٹھایا گیا۔`,
    story: [
      `ابن حجر مصر میں 773ھ میں پیدا ہوئے اور یتیم پروان چڑھے۔ نو سال میں قرآن حفظ کیا، اور طلبِ حدیث میں حجاز، یمن اور شام کا سفر کیا یہاں تک کہ اپنے عہد کے لوگوں سے آگے نکل گئے، اور کئی بار مصر کی قضا اور قلعۃ الجبل میں املائے حدیث کا منصب سنبھالا۔`,
      `اُنہوں نے قریباً ایک سو پچاس تصانیف لکھیں، جن کے سرخیل "فتح الباری" ہے جس میں اُنہوں نے چوتھائی صدی خرچ کی یہاں تک کہ کہا گیا: فتح کے بعد کوئی ہجرت نہیں، نیز "الإصابہ فی تمییز الصحابہ"، "تہذیب التہذیب"، "لسان المیزان"، "بلوغ المرام" اور "نخبۃ الفکر" — تو آپ اپنے بعد اہلِ حدیث کا مرجع بن گئے۔`,
      `آپ ہفتہ 28 ذوالحجہ 852ھ کی رات وفات پائے، تو قاہرہ نے اپنے بازار بند کر دیے، اور آپ کے جنازے میں خلیفہ، سلطان، قضاۃ اور پچاس ہزار کے قریب اندازہ شدہ خلائق بارش برستے میں شریک ہوئے، یہاں تک کہ کہا گیا: آسمان نے حافظ کے فقدان پر اپنے آنسو بہائے۔`,
    ],
    source: `السخاوی، الجواہر والدرر فی ترجمہ شیخ الإسلام ابن حجر`,
  },
};

// ————————————————— Helpers —————————————————

function arContent(ev: OtdEvent): OtdContent {
  return { year: ev.year, title: ev.title, summary: ev.summary, story: ev.story, source: ev.source, disputed: ev.disputed };
}

/** Localized content for an event; falls back to Arabic if a translation is missing. */
export function otdContent(ev: OtdEvent, lang: LangLike): OtdContent {
  const l = toLang(lang);
  if (l === 'en') return OTD_EN[ev.slug] ?? arContent(ev);
  if (l === 'ur') return OTD_UR[ev.slug] ?? arContent(ev);
  return arContent(ev);
}

const OTD_BASE: Record<Lang, string> = { ar: '/on-this-day/', en: '/en/on-this-day/', ur: '/ur/on-this-day/' };
export const otdBase = (lang: LangLike) => OTD_BASE[toLang(lang)];
export const otdPathL = (slug: string, lang: LangLike) => `${otdBase(lang)}${slug}/`;
/** Path of a slug in every language — for hreflang alternates. */
export const otdAltPaths = (slug: string) => ({ ar: `/on-this-day/${slug}/`, en: `/en/on-this-day/${slug}/`, ur: `/ur/on-this-day/${slug}/` });

const AH: Record<Lang, string> = { ar: 'هـ', en: 'AH', ur: 'ھ' };
export const ahSuffix = (lang: LangLike) => AH[toLang(lang)];

export function fmtHDayL(hm: number, hd: number, lang: LangLike): string {
  const l = toLang(lang);
  const mon = l === 'ar' ? H_MON_AR : l === 'ur' ? H_MON_UR : H_MON_EN;
  return `${hd} ${mon[hm - 1]}`;
}

/** «N years ago» — only for events dated in a plain Hijri year (contains هـ). */
export function otdAgo(ev: OtdEvent, curHy: number): number | null {
  if (!/هـ/.test(ev.year)) return null;
  const m = ev.year.match(/^(\d+)/);
  return m ? curHy - parseInt(m[1], 10) : null;
}

/** A small emoji for the event type — derived from the Arabic title so it is language-independent. */
export function otdIcon(ev: OtdEvent): string {
  const t = ev.title;
  if (/الإمام|الحافظ|شيخ الإسلام|الفيلسوف|مكتشف|صاحب/.test(t)) return '📚';
  if (/غزوة|معركة|حصار|وقعة|صفّين|الخندق/.test(t)) return '⚔️';
  if (/فتح|استرداد|تحرير/.test(t)) return '🕌';
  if (/وفاة|استشهاد|مقتل|طعن/.test(t)) return '🕯️';
  if (/مولد|ولادة/.test(t)) return '🌟';
  if (/بيعة|خلافة|دولة|سلطان|تقويم/.test(t)) return '👑';
  return '📜';
}

/** WhatsApp share link with a localized caption. */
export function whatsappHrefL(ev: OtdEvent, lang: LangLike): string {
  const l = toLang(lang);
  const c = otdContent(ev, l);
  const hd = fmtHDayL(ev.hm, ev.hd, l);
  const url = 'https://islamicdates.org' + otdPathL(ev.slug, l);
  let txt: string;
  if (l === 'en') {
    txt = `🌙 On this day in Hijri history (${hd})\n*${c.title}* — ${c.year}\n\n${c.summary}\n\nRead the full story:\n${url}`;
  } else if (l === 'ur') {
    txt = `🌙 اِسی ہجری دن (${hd})\n*${c.title}* — ${c.year}\n\n${c.summary}\n\nمکمل کہانی پڑھیں:\n${url}`;
  } else {
    txt = `🌙 في مثل هذا اليوم الهجري (${hd})\n*${c.title}* — ${c.year}\n\n${c.summary}\n\nاقرأ القصة كاملة:\n${url}`;
  }
  return 'https://wa.me/?text=' + encodeURIComponent(txt);
}

// Re-export the shared, language-agnostic selectors so pages can import from one place.
export { eventForDay, eventsOfMonth, eventsOn } from './onthisday';
export { OTD_EVENTS };
