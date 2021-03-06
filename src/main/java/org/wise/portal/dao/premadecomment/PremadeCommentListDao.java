/**
 * Copyright (c) 2008-2015 Regents of the University of California (Regents).
 * Created by WISE, Graduate School of Education, University of California, Berkeley.
 * 
 * This software is distributed under the GNU General Public License, v3,
 * or (at your option) any later version.
 * 
 * Permission is hereby granted, without written agreement and without license
 * or royalty fees, to use, copy, modify, and distribute this software and its
 * documentation for any purpose, provided that the above copyright notice and
 * the following two paragraphs appear in all copies of this software.
 * 
 * REGENTS SPECIFICALLY DISCLAIMS ANY WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE. THE SOFTWARE AND ACCOMPANYING DOCUMENTATION, IF ANY, PROVIDED
 * HEREUNDER IS PROVIDED "AS IS". REGENTS HAS NO OBLIGATION TO PROVIDE
 * MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS, OR MODIFICATIONS.
 * 
 * IN NO EVENT SHALL REGENTS BE LIABLE TO ANY PARTY FOR DIRECT, INDIRECT,
 * SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS,
 * ARISING OUT OF THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF
 * REGENTS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
package org.wise.portal.dao.premadecomment;

import java.util.List;


import org.wise.portal.dao.SimpleDao;
import org.wise.portal.domain.premadecomment.PremadeCommentList;
import org.wise.portal.domain.run.Run;
import org.wise.portal.domain.user.User;

/**
 * @author Patrick Lawler
 */
public interface PremadeCommentListDao<T extends PremadeCommentList> extends SimpleDao<T>{

	/**
	 * Returns a <code>List<PremadeCommentList></code> that the given <code>User</code> owns.
	 * 
	 * @param <code>User</code> user
	 * @return <code>List<PremadeCommentList></code>
	 */
	List<PremadeCommentList> getListByOwner(User user);
	
	/**
	 * Returns a <code>List<PremadeCommentList></code> that is associated with the given <code>Run</code>.
	 * 
	 * @param <code>Run</code> run
	 * @return <code>List<PremadeCommentList></code>
	 */
	List<PremadeCommentList> getListByRun(Run run);
	
	/**
	 * Returns a List of PremadeCommentList that are associated with the given project id
	 * @param projectId
	 * @return
	 */
	List<PremadeCommentList> getListByProject(Long projectId);
	
	/**
	 * Returns a List of PremadeCommentList that have the global field set to true.
	 * @return
	 */
	List<PremadeCommentList> getListByGlobal();
	
	/**
	 * Returns a PremadeCommentList that has the given id
	 * @param the id of the PremadeCommentList
	 * @return a PremadeCommentList or null if there is no PremadeCommentList
	 * with the given id
	 */
	PremadeCommentList getListById(Long id);
}
