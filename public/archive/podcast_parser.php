<?php 

require('../include/db.php');
include('../include/xml_parser.php');
require('../include/functions.php');
//echo $_GET['show'];
$xml = file_get_contents('http://www.growradio.org/archive/' . str_replace('\\','', str_replace(' ','_', urldecode($_GET['show']))) . '_podcast.rss');

$parser = new XMLParser($xml);
$parser->Parse();

$PAGE_TITLE = $parser->document->channel[0]->title[0]->tagData;
include('../include/header.php'); 
?>


  <div id="main-side">
		<div id="archives">
		 <div class="big-top"></div>
		 <div class="big-cont clearfix">
			<div class="big-text">
			 <span style="color:#329800;font-size:20px;font-weight:bold;"><?= $parser->document->channel[0]->title[0]->tagData; ?></span><br/>
			 <div style="margin-left:10px">
				 <p style="color:#329800;font-size:12px;font-weight:bold;">To save a file, right-click (apple click with mac) on the link<br/>and select "Save Target/Link As"
         <div id="text">
          <?php $doc = isset($parser->document->channel[0]->item[0]) ? $parser->document->channel[0]->item : $parser->document->channel[0] ; ?>
   <?php foreach( $doc as $pcast){ ?>

          <TABLE width="100%" style="margin-bottom:5px;margin-top:10px;font-size:13px;">
            <TR>
               <TD>
                <B><A title="Click to download" href="<?= $pcast->enclosure[0]->tagAttrs['url']; ?>" type="audio/mpeg"><?= $pcast->title[0]->tagData; ?></A></B>
               </TD>
            </TR>
            <TR>
                <TD>
                    <?= preg_replace('@(https?://([-\w\.]+)+(:\d+)?(/([\w/_\.]*(\?\S+)?)?)?)@',
             '<a href="$1">$1</a>', $pcast->description[0]->tagData); ?>
                    <BR>
                </TD>
            </tr>
            <tr>
                <td>
	               <?php
	                  preg_match('@(https?://([-\w\.]+)+(:\d+)?(/([\w/_\.]*(\?\S+)?)?)?)@', $pcast->description[0]->tagData, $m);
                    $t = explode('?',$m[0]);
                    $f = explode('&',$t[1]);
                    //$show = substr($f[0],5);
                    $date = substr($f[1],5);
                    //echo $date;
                    //echo $date;
                 if($date != ''){
                    $query = "SELECT * FROM pl_show_tracks WHERE show_id = {$date} ORDER by time ASC";
                    $results = $db->query($query);
	               ?>
	                <div id="plbutt" class="clearfix" style="float:left;text-align:left;margin:10px;font-weight:bold;width:590px;">
								       <a href="#" id="plbutton" style="font-size:11px;background:none;border:none;margin-top:5px;" 
								         onclick="$('#plwindow<?= $date; ?>').slideToggle();this.innerHTML == '[&#43;] Playlist' ? this.innerHTML = '[&ndash;] Playlist' : this.innerHTML = '[&#43;] Playlist';">[&#43;] Playlist</a>
								   </div>
								
						       <div id="plwindow<?= $date; ?>" style="display:none;float:left">
										
										<div id="pltracks" >
											    	<table style="font-size:12px;margin-right:10px;width:560px;">
							                 <tr class="header"><td>Artist</td><td>Title</td><td>Album</td><td>Label</td></tr>
							                 <?php 
							                        $wcolor="#FFF";
																			$gcolor="#CF9";
																			$col = $gcolor;
																			
							                        while($row = $results->fetch_object()){
								                      $col = $col == $wcolor ? $gcolor : $wcolor;
											echo "<tr style=\"background-color:{$col};\"><td>{$row->artist}</td><td>{$row->title}</td><td>{$row->album}</td><td>{$row->label}</td>";

																			}
							                        //echo $m[0];
							                  ?>
							              </table>
										</div>
								  </div>
					  <?php }//if date no empty ?>
	                
	              </td>
            </TR>

          </TABLE>
   <?php } ?>
        </div>
       </div>
      </div>
     </div><!--big-cont-->
     <img class="big-bottom" src="http://www.growradio.org/images/big-bottom.png"/>
    </div><!--archives-->
  </div><!--main-side-->
	<div id="sidebar">
		<?php
		  include('../include/sidebar.php');
		?>
        </div>
          
<?php
   include('../include/footer.php');
?>
