# python-pptx 1.0.2 API reference (by area)

Read the section you need. Everything here is available in the version installed in this environment.

## Contents
1. Presentation file
2. Slides
3. Shapes
4. Text
5. Tables
6. Charts
7. Formatting (DML)
8. Low-level XML access
9. Not supported

## 1. Presentation file

```python
from pptx import Presentation
from pptx.util import Inches, Pt, Cm, Emu

prs = Presentation()                 # new (4:3 default template)
prs = Presentation("in.pptx")        # open existing (path or file-like)
prs.slide_width, prs.slide_height = Inches(13.333), Inches(7.5)   # 16:9
cp = prs.core_properties             # title, author, subject, keywords, created, modified, revision ...
cp.title = "Deck"
prs.save("out.pptx")                 # path or BytesIO
```

## 2. Slides

```python
layout = prs.slide_layouts[6]                  # 0 title, 1 title+content, 5 title only, 6 blank
layout = prs.slide_layouts.get_by_name("Title Only")
slide = prs.slides.add_slide(layout)
prs.slides.index(slide); prs.slides.get(slide_id)
slide.notes_slide.notes_text_frame.text = "speaker notes"
slide.background.fill.solid(); slide.background.fill.fore_color.rgb = RGBColor(0xEE, 0xF3, 0xFA)
slide.follow_master_background = True
prs.slide_layouts.remove(layout)               # only if layout.used_by_slides is empty
prs.slide_masters                              # masters and their layouts
```

## 3. Shapes

```python
from pptx.enum.shapes import MSO_SHAPE, MSO_CONNECTOR

shp = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, w, h)
shp.adjustments[0] = 0.2                       # corner radius etc.
shp.rotation = 15
box = slide.shapes.add_textbox(left, top, w, h)
pic = slide.shapes.add_picture("img.png", left, top, width=None, height=None)
pic.crop_left = 0.1                            # crop_* as fraction
con = slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, x1, y1, x2, y2)
con.begin_connect(shp_a, 3); con.end_connect(shp_b, 1)
grp = slide.shapes.add_group_shape(); grp.shapes.add_shape(...)
ff = slide.shapes.build_freeform(x, y, scale=1.0); ff.add_line_segments([(x2, y2), (x3, y3)]); ff.convert_to_shape()
slide.shapes.add_movie("v.mp4", left, top, w, h, poster_frame_image="p.png", mime_type="video/mp4")
slide.shapes.add_ole_object("data.xlsx", prog_id="Excel.Sheet.12", left=..., top=...)

# placeholders (layouts with title/body/picture/table/chart placeholders)
slide.shapes.title.text = "Title"
ph = slide.placeholders[1]; ph.text = "Body"
ph.insert_picture("img.png"); ph.insert_table(rows, cols); ph.insert_chart(XL_CHART_TYPE.PIE, chart_data)

# click actions / hyperlinks on shapes
shp.click_action.hyperlink.address = "https://example.com"
shp.click_action.target_slide = prs.slides[3]
```

Common shape properties: `left, top, width, height, name, shape_id, shape_type, has_text_frame, has_chart, has_table`.

## 4. Text

```python
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR, MSO_AUTO_SIZE

tf = shape.text_frame
tf.clear(); tf.word_wrap = True; tf.vertical_anchor = MSO_ANCHOR.MIDDLE
tf.margin_left = Inches(0.1)
tf.auto_size = MSO_AUTO_SIZE.TEXT_TO_FIT_SHAPE
tf.fit_text(font_family="Malgun Gothic", max_size=24)   # needs the font file available

p = tf.paragraphs[0]; p.alignment = PP_ALIGN.CENTER; p.level = 1
p.line_spacing = 1.2; p.space_before = Pt(6); p.space_after = Pt(6)
r = p.add_run(); r.text = "Hello"; p.add_line_break()
f = r.font; f.name = "맑은 고딕"; f.size = Pt(18); f.bold = True; f.italic = False; f.underline = True
f.color.rgb = RGBColor(0x1F, 0x38, 0x64); f.color.theme_color = MSO_THEME_COLOR.ACCENT_1
r.hyperlink.address = "https://example.com"
```

Korean text: `font.name` only writes `<a:latin>`. Also set `<a:ea>` (East Asian) or Korean falls back to the theme font — `build_pptx.py`'s `set_font()` shows how.

## 5. Tables

```python
tbl = slide.shapes.add_table(rows, cols, left, top, w, h).table
tbl.columns[0].width = Inches(2); tbl.rows[0].height = Inches(0.5)
cell = tbl.cell(0, 0); cell.text = "A"
cell.fill.solid(); cell.fill.fore_color.rgb = RGBColor(0x1F, 0x38, 0x64)
cell.vertical_anchor = MSO_ANCHOR.MIDDLE; cell.margin_left = Inches(0.1)
cell.merge(tbl.cell(0, 2)); cell.is_merge_origin; tbl.cell(0, 1).is_spanned; cell.split()
tbl.first_row = True; tbl.horz_banding = False; tbl.first_col = tbl.last_row = tbl.last_col = tbl.vert_banding = False
```

## 6. Charts

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
ser.points[1].format.fill.solid()             # per-point colour
chart.replace_data(new_chart_data)             # update an existing chart
```

Chart types python-pptx can **create**: column/bar (clustered, stacked, 100% stacked), line (with/without markers, stacked), pie (incl. exploded), doughnut, area (incl. stacked), XY scatter (`XyChartData`), bubble (`BubbleChartData`), radar. 3D, stock, surface, cone/cylinder/pyramid exist in the enum but can only be read from existing files.

## 7. Formatting (DML)

```python
shape.fill.solid(); shape.fill.fore_color.rgb = RGBColor(0x2E, 0x75, 0xB6)
shape.fill.fore_color.brightness = 0.4         # lighten (-1..1)
shape.fill.gradient(); shape.fill.gradient_angle = 90; shape.fill.gradient_stops[0].color.rgb = ...
shape.fill.patterned(); shape.fill.background()   # transparent
shape.line.color.rgb = ...; shape.line.width = Pt(1.5); shape.line.dash_style = MSO_LINE.DASH
shape.shadow.inherit = False                   # only on/off-inherit; no detailed shadow control
```

Units: `Inches`, `Cm`, `Pt`, `Emu` (1 inch = 914400 EMU).

## 8. Low-level XML access

Every proxy object exposes its lxml element (`shape._element`, `slide._element`, `run._r`, `font._rPr`). Use `pptx.oxml.ns.qn("a:ea")` for tag names. Typical uses:

```python
# delete a slide
sldIdLst = prs.slides._sldIdLst
rId = sldIdLst[i].rId; prs.part.drop_rel(rId); del sldIdLst[i]
# move a slide to position j
el = sldIdLst[i]; sldIdLst.remove(el); sldIdLst.insert(j, el)
```

## 9. Not supported by the API

Animations, slide transitions, SmartArt authoring, rendering to image/PDF, legacy `.ppt` files, VBA macros, detailed shadow/glow/3D effects, creating 3D/stock/surface charts. Slide delete/reorder/duplicate need the XML workarounds above.
