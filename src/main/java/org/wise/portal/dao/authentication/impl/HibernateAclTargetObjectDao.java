/**
 * Copyright (c) 2007-2015 Encore Research Group, University of Toronto
 *
 * This software is distributed under the GNU General Public License, v3,
 * or (at your option) any later version.
 * 
 * Permission is hereby granted, without written agreement and without license
 * or royalty fees, to use, copy, modify, and distribute this software and its
 * documentation for any purpose, provided that the above copyright notice and
 * the following two paragraphs appear in all copies of this software.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Public License for more details.
 *
 * You should have received a copy of the GNU Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */
package org.wise.portal.dao.authentication.impl;

import org.springframework.dao.support.DataAccessUtils;
import org.springframework.stereotype.Repository;
import org.wise.portal.dao.authentication.AclTargetObjectDao;
import org.wise.portal.dao.impl.AbstractHibernateDao;
import org.wise.portal.domain.authentication.MutableAclTargetObject;
import org.wise.portal.domain.authentication.impl.PersistentAclTargetObject;

/**
 * This class is not being used. Tried to implement Hibernate versions of the acl
 * services and became bogged down, so went back to jdbc versions. Keeping this
 * class around in case we want to try again later.
 * 
 * @author Cynick Young
 */
@Repository
public class HibernateAclTargetObjectDao extends
        AbstractHibernateDao<MutableAclTargetObject> implements
        AclTargetObjectDao<MutableAclTargetObject> {

    private static final String FIND_ALL_QUERY = "from PersistentAclTargetObject";

    /**
     * @see org.wise.portal.dao.impl.AbstractHibernateDao#getDataObjectClass()
     */
    @Override
    protected Class<PersistentAclTargetObject> getDataObjectClass() {
        return PersistentAclTargetObject.class;
    }

    /**
     * @see org.wise.portal.dao.impl.AbstractHibernateDao#getFindAllQuery()
     */
    @Override
    protected String getFindAllQuery() {
        return FIND_ALL_QUERY;
    }

    /**
     * @see org.wise.portal.dao.authentication.AclTargetObjectDao#retrieveByClassname(java.lang.String)
     */
    public MutableAclTargetObject retrieveByClassname(String classname) {
        return (MutableAclTargetObject) DataAccessUtils
                .uniqueResult(this
                        .getHibernateTemplate()
                        .findByNamedParam(
                                "from PersistentAclTargetObject as target where target.classname = :classname",
                                "classname", classname));
    }
}