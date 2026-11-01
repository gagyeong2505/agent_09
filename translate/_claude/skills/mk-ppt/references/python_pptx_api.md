# python-pptx 1.0.2 API 참고 (분야별)

필요한 부분만 읽으세요. 여기 있는 모든 기능은 이 환경에 설치된 버전에서 사용할 수 있습니다.

## 목차
1. 프레젠테이션 파일
2. 슬라이드
3. 도형
4. 텍스트
5. 표
6. 차트
7. 서식(DML)
8. 저수준 XML 접근
9. 지원하지 않는 기능

## 1. 프레젠테이션 파일

```python
from pptx import Presentation
from pptx.util import Inches, Pt, Cm, Emu

prs = Presentation()                 # 새 파일 (기본 템플릿은 4:3)
prs = Presentation("in.pptx")        # 기존 파일 열기 (경로 또는 파일 객체)
prs.slide_width, prs.slide_height = Inches(13.333), Inches(7.5)   # 16:9
cp = prs.core_properties             # 제목, 작성자, 주제, 키워드, 작성일, 수정일, 개정 번호 ...
cp.title = "Deck"
prs.save("out.pptx")                 # 경로 또는 BytesIO
```

## 2. 슬라이드

```python
layout = prs.slide_layouts[6]                  # 0 제목, 1 제목+내용, 5 제목만, 6 빈 화면
layout = prs.slide_layouts.get_by_name("Title Only")
slide = prs.slides.add_slide(layout)
prs.slides.index(slide); prs.slides.get(slide_id)
slide.notes_slide.notes_text_frame.text = "발표자 노트"
slide.background.fill.solid(); slide.background.fill.fore_color.rgb = RGBColor(0xEE, 0xF3, 0xFA)
slide.follow_master_background = True
prs.slide_layouts.remove(layout)               # layout.used_by_slides가 비어 있을 때만
prs.slide_masters                              # 마스터와 그 레이아웃
```

## 3. 도형

```python
from pptx.enum.shapes import MSO_SHAPE, MSO_CONNECTOR

shp = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, w, h)
shp.adjustments[0] = 0.2                       # 모서리 반경 등
shp.rotation = 15
box = slide.shapes.add_textbox(left, top, w, h)
pic = slide.shapes.add_picture("img.png", left, top, width=None, height=None)
pic.crop_left = 0.1                            # crop_*는 비율
con = slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, x1, y1, x2, y2)
con.begin_connect(shp_a, 3); con.end_connect(shp_b, 1)
grp = slide.shapes.add_group_shape(); grp.shapes.add_shape(...)
ff = slide.shapes.build_freeform(x, y, scale=1.0); ff.add_line_segments([(x2, y2), (x3, y3)]); ff.convert_to_shape()
slide.shapes.add_movie("v.mp4", left, top, w, h, poster_frame_image="p.png", mime_type="video/mp4")
slide.shapes.add_ole_object("data.xlsx", prog_id="Excel.Sheet.12", left=..., top=...)

# 플레이스홀더 (제목/본문/그림/표/차트 플레이스홀더가 있는 레이아웃)
slide.shapes.title.text = "Title"
ph = slide.placeholders[1]; ph.text = "Body"
ph.insert_picture("img.png"); ph.insert_table(rows, cols); ph.insert_chart(XL_CHART_TYPE.PIE, chart_data)

# 도형의 클릭 동작 / 하이퍼링크
shp.click_action.hyperlink.address = "https://example.com"
shp.click_action.target_slide = prs.slides[3]
```

공통 도형 속성: `left, top, width, height, name, shape_id, shape_type, has_text_frame, has_chart, has_table`.

## 4. 텍스트

```python
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR, MSO_AUTO_SIZE

tf = shape.text_frame
tf.clear(); tf.word_wrap = True; tf.vertical_anchor = MSO_ANCHOR.MIDDLE
tf.margin_left = Inches(0.1)
tf.auto_size = MSO_AUTO_SIZE.TEXT_TO_FIT_SHAPE
tf.fit_text(font_family="Malgun Gothic", max_size=24)   # 글꼴 파일이 있어야 함

p = tf.paragraphs[0]; p.alignment = PP_ALIGN.CENTER; p.level = 1
p.line_spacing = 1.2; p.space_before = Pt(6); p.space_after = Pt(6)
r = p.add_run(); r.text = "Hello"; p.add_line_break()
f = r.font; f.name = "맑은 고딕"; f.size = Pt(18); f.bold = True; f.italic = False; f.underline = True
f.color.rgb = RGBColor(0x1F, 0x38, 0x64); f.color.theme_color = MSO_THEME_COLOR.ACCENT_1
r.hyperlink.address = "https://example.com"
```

한글 텍스트: `font.name`은 `<a:latin>`만 씁니다. `<a:ea>`(동아시아)도 설정해야 하며, 그렇지 않으면 한글이 테마 글꼴로 대체됩니다. 방법은 `build_pptx.py`의 `set_font()`를 참고하세요.

## 5. 표

```python
tbl = slide.shapes.add_table(rows, cols, left, top, w, h).table
tbl.columns[0].width = Inches(2); tbl.rows[0].height = Inches(0.5)
cell = tbl.cell(0, 0); cell.text = "A"
cell.fill.solid(); cell.fill.fore_color.rgb = RGBColor(0x1F, 0x38, 0x64)
cell.vertical_anchor = MSO_ANCHOR.MIDDLE; cell.margin_left = Inches(0.1)
cell.merge(tbl.cell(0, 2)); cell.is_merge_origin; tbl.cell(0, 1).is_spanned; cell.split()
tbl.first_row = True; tbl.horz_banding = False; tbl.first_col = tbl.last_row = tbl.last_col = tbl.vert_banding = False
```

## 6. 차트

```python
from pptx.chart.data import CategoryChartData, XyChartData, BubbleChartData
from pptx.enum.chart import XL_CHART_TYPE, XL_LEGEND_POSITION, XL_LABEL_POSITION

data = CategoryChartData(number_format="0.0")
data.categories = ["2023", "2024", "2025"]
data.add_series("Adoption", (55, 78, 88))
chart = slide.shapes.add_chart(XL_CHART_TYPE.COLUMN_CLUSTERED, x, y, w, h, data).chart

chart.has_legend = True; chart.legend.position = XL_LEGEND_POSITION.BOTTOM; chart.legend.include_in_layout = False
chart.has_title = True; chart.chart_title.text_frame.text = "Title"
plot = chart.plots[0]; plot.gap_width = 80; plot.overlap = 0
plot.has_data_labels = True; plot.data_labels.number_format = "0%"; plot.data_labels.position = XL_LABEL_POSITION.OUTSIDE_END
va = chart.value_axis; va.minimum_scale = 0; va.maximum_scale = 100; va.has_major_gridlines = True
va.tick_labels.font.size = Pt(12); chart.category_axis.tick_labels.font.size = Pt(12)
ser = plot.series[0]; ser.format.fill.solid(); ser.format.fill.fore_color.rgb = RGBColor(...)
ser.points[1].format.fill.solid()             # 데이터 요소별 색
chart.replace_data(new_chart_data)             # 기존 차트 데이터 교체
```

python-pptx로 **새로 만들 수 있는** 차트: 세로/가로 막대(묶은형, 누적형, 100% 누적형), 꺾은선(표식 유무, 누적형), 원형(쪼개진 원형 포함), 도넛형, 영역형(누적형 포함), 분산형(`XyChartData`), 거품형(`BubbleChartData`), 방사형. 3D, 주식형, 표면형, 원뿔/원통/피라미드형은 열거형에는 있지만 기존 파일에서 읽기만 가능합니다.

## 7. 서식(DML)

```python
shape.fill.solid(); shape.fill.fore_color.rgb = RGBColor(0x2E, 0x75, 0xB6)
shape.fill.fore_color.brightness = 0.4         # 밝게 (-1..1)
shape.fill.gradient(); shape.fill.gradient_angle = 90; shape.fill.gradient_stops[0].color.rgb = ...
shape.fill.patterned(); shape.fill.background()   # 투명
shape.line.color.rgb = ...; shape.line.width = Pt(1.5); shape.line.dash_style = MSO_LINE.DASH
shape.shadow.inherit = False                   # 상속 여부만 가능, 세부 그림자 조정 불가
```

단위: `Inches`, `Cm`, `Pt`, `Emu` (1인치 = 914400 EMU).

## 8. 저수준 XML 접근

모든 프록시 객체는 lxml 요소를 노출합니다(`shape._element`, `slide._element`, `run._r`, `font._rPr`). 태그 이름에는 `pptx.oxml.ns.qn("a:ea")`를 씁니다. 대표적인 사용 예:

```python
# 슬라이드 삭제
sldIdLst = prs.slides._sldIdLst
rId = sldIdLst[i].rId; prs.part.drop_rel(rId); del sldIdLst[i]
# 슬라이드를 j 위치로 이동
el = sldIdLst[i]; sldIdLst.remove(el); sldIdLst.insert(j, el)
```

## 9. API가 지원하지 않는 기능

애니메이션, 슬라이드 전환, SmartArt 작성, 이미지/PDF 렌더링, 구버전 `.ppt` 파일, VBA 매크로, 세밀한 그림자/광선/3D 효과, 3D/주식형/표면형 차트 생성. 슬라이드 삭제·순서 변경·복제는 위의 XML 우회 방법이 필요합니다.
